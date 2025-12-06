import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Server-side Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 환경 변수에 추가 필요
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // 가설 1: CTA 클릭률
    const { data: ctrData, error: ctrError } = await supabase.rpc('get_cta_clickthrough_rate', {
      start_date: startDate.toISOString(),
      end_date: new Date().toISOString(),
    });

    if (ctrError) throw ctrError;

    // 가설 2: 폼 제출률
    const { data: conversionData, error: conversionError } = await supabase.rpc('get_form_conversion_rate', {
      start_date: startDate.toISOString(),
      end_date: new Date().toISOString(),
    });

    if (conversionError) throw conversionError;

    // 가설 3: 유효 연락처 비율
    const { data: validContactData, error: validContactError } = await supabase.rpc('get_valid_contact_rate', {
      start_date: startDate.toISOString(),
      end_date: new Date().toISOString(),
    });

    if (validContactError) throw validContactError;

    // 전체 퍼널 데이터
    const { data: funnelData, error: funnelError } = await supabase.from('v_conversion_funnel').select('*').single();

    if (funnelError) throw funnelError;

    // 트래픽 소스별 데이터
    const { data: trafficData, error: trafficError } = await supabase.from('v_traffic_source_conversion').select('*');

    if (trafficError) throw trafficError;

    // 일별 가입 추이 (최근 30일)
    const { data: dailyData, error: dailyError } = await supabase
      .from('v_daily_signups')
      .select('*')
      .order('signup_date', { ascending: false })
      .limit(days);

    if (dailyError) throw dailyError;

    return NextResponse.json({
      success: true,
      data: {
        // 가설 검증 메트릭
        hypothesis: {
          cta_clickthrough: {
            ...ctrData[0],
            target: { min: 15, max: 20 },
            status: getStatus(ctrData[0]?.ctr_percentage, 15, 20),
          },
          form_conversion: {
            ...conversionData[0],
            target: { min: 20 },
            status: getStatus(conversionData[0]?.conversion_percentage, 20),
          },
          valid_contact: {
            ...validContactData[0],
            target: { min: 80 },
            status: getStatus(validContactData[0]?.valid_percentage, 80),
          },
        },
        // 추가 인사이트
        funnel: funnelData,
        traffic_sources: trafficData,
        daily_trend: dailyData,
      },
      period: {
        days,
        start_date: startDate.toISOString(),
        end_date: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics data',
      },
      { status: 500 }
    );
  }
}

// 목표 달성 여부 판단 헬퍼 함수
function getStatus(value: number | undefined, min: number, max?: number): 'success' | 'warning' | 'danger' {
  if (value === undefined || value === null) return 'danger';

  if (max !== undefined) {
    // 범위 목표 (예: 15~20%)
    if (value >= min && value <= max) {
      // 정확히 목표 범위 내
      return 'success';
    }

    // 목표 범위를 벗어난 경우
    const lowerBound = min * 0.8; // 15 * 0.8 = 12
    const upperBound = max * 1.2; // 20 * 1.2 = 24

    if (value >= lowerBound && value <= upperBound) {
      // 허용 범위 내 (목표에서 약간 벗어남)
      return 'warning';
    }

    // 목표보다 훨씬 높거나 낮은 경우
    // 15~20% 목표에서 50%는 매우 높지만, 낮은 것보다는 나음
    if (value >= min) {
      // 최소값은 넘었지만 최대값을 초과 → warning
      return 'warning';
    }

    // 최소값도 못 넘음 → danger
    return 'danger';
  } else {
    // 최소값 목표 (예: 80% 이상)
    if (value >= min) return 'success';
    if (value >= min * 0.8) return 'warning';
    return 'danger';
  }
}
