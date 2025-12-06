'use client';
import { useEffect, useState } from 'react';

interface HypothesisMetric {
  total_page_views?: number;
  total_cta_clicks?: number;
  ctr_percentage?: number;
  total_form_submits?: number;
  conversion_percentage?: number;
  total_contacts?: number;
  valid_contacts?: number;
  valid_percentage?: number;
  target: { min: number; max?: number };
  status: 'success' | 'warning' | 'danger';
}

interface FunnelData {
  page_views: number;
  input_starts: number;
  cta_clicks: number;
  successful_submits: number;
  engagement_rate: number;
  cta_ctr: number;
  form_conversion: number;
}

interface TrafficSource {
  traffic_source: string;
  total_signups: number;
  completed_signups: number;
  conversion_rate: number;
}

interface DailyTrend {
  signup_date: string;
  total_signups: number;
  unique_sources: number;
}

interface AnalyticsData {
  hypothesis: {
    cta_clickthrough: HypothesisMetric;
    form_conversion: HypothesisMetric;
    valid_contact: HypothesisMetric;
  };
  funnel: FunnelData;
  traffic_sources: TrafficSource[];
  daily_trend: DailyTrend[];
}

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?days=${period}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'danger':
        return '✗';
      default:
        return '?';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const { hypothesis, funnel, traffic_sources, daily_trend } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OpenSaunas 랜딩 페이지 분석</h1>
          <p className="text-gray-600">가설 검증 대시보드</p>

          {/* Period Selector */}
          <div className="mt-4 flex gap-2">
            {[1, 3, 5, 7, 14].map((days) => (
              <button
                key={days}
                onClick={() => setPeriod(days)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === days ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {days}일
              </button>
            ))}
            <button
              onClick={fetchAnalytics}
              className="ml-auto px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ↻ 새로고침
            </button>
          </div>
        </div>

        {/* 가설 검증 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 가설 1: CTA 클릭률 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">가설 ① CTA 클릭률</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  hypothesis.cta_clickthrough.status
                )}`}
              >
                {getStatusIcon(hypothesis.cta_clickthrough.status)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {hypothesis.cta_clickthrough.ctr_percentage?.toFixed(1) || 0}%
                </span>
                <span className="text-sm text-gray-500">
                  목표: {hypothesis.cta_clickthrough.target.min}~{hypothesis.cta_clickthrough.target.max}%
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>페이지 뷰: {hypothesis.cta_clickthrough.total_page_views?.toLocaleString() || 0}</p>
                <p>CTA 클릭: {hypothesis.cta_clickthrough.total_cta_clicks?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          {/* 가설 2: 폼 제출률 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">가설 ② 폼 제출률</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  hypothesis.form_conversion.status
                )}`}
              >
                {getStatusIcon(hypothesis.form_conversion.status)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {hypothesis.form_conversion.conversion_percentage?.toFixed(1) || 0}%
                </span>
                <span className="text-sm text-gray-500">목표: ≥{hypothesis.form_conversion.target.min}%</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>CTA 클릭: {hypothesis.form_conversion.total_cta_clicks?.toLocaleString() || 0}</p>
                <p>폼 제출: {hypothesis.form_conversion.total_form_submits?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          {/* 가설 3: 유효 연락처 비율 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">가설 ③ 유효 연락처</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  hypothesis.valid_contact.status
                )}`}
              >
                {getStatusIcon(hypothesis.valid_contact.status)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {hypothesis.valid_contact.valid_percentage?.toFixed(1) || 0}%
                </span>
                <span className="text-sm text-gray-500">목표: ≥{hypothesis.valid_contact.target.min}%</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>전체 시도: {hypothesis.valid_contact.total_contacts?.toLocaleString() || 0}</p>
                <p>유효: {hypothesis.valid_contact.valid_contacts?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 전환 퍼널 */}
        {funnel && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">전환 퍼널</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">페이지 방문</p>
                <p className="text-2xl font-bold text-gray-900">{funnel.page_views?.toLocaleString() || 0}</p>
              </div>
              <div className="flex items-center justify-center text-gray-400">→</div>
              <div className="flex-1 text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">입력 시작</p>
                <p className="text-2xl font-bold text-gray-900">{funnel.input_starts?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-500 mt-1">{funnel.engagement_rate?.toFixed(1) || 0}%</p>
              </div>
              <div className="flex items-center justify-center text-gray-400">→</div>
              <div className="flex-1 text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">CTA 클릭</p>
                <p className="text-2xl font-bold text-gray-900">{funnel.cta_clicks?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-500 mt-1">{funnel.cta_ctr?.toFixed(1) || 0}%</p>
              </div>
              <div className="flex items-center justify-center text-gray-400">→</div>
              <div className="flex-1 text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">제출 완료</p>
                <p className="text-2xl font-bold text-gray-900">{funnel.successful_submits?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-500 mt-1">{funnel.form_conversion?.toFixed(1) || 0}%</p>
              </div>
            </div>
          </div>
        )}

        {/* 트래픽 소스 */}
        {traffic_sources && traffic_sources.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">트래픽 소스별 전환율</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">소스</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">가입자 수</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">완료 수</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">전환율</th>
                  </tr>
                </thead>
                <tbody>
                  {traffic_sources.map((source, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{source.traffic_source}</td>
                      <td className="py-3 px-4 text-right">{source.total_signups}</td>
                      <td className="py-3 px-4 text-right">{source.completed_signups}</td>
                      <td className="py-3 px-4 text-right font-semibold">{source.conversion_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 일별 추이 */}
        {daily_trend && daily_trend.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">일별 가입 추이</h3>
            <div className="space-y-2">
              {daily_trend.slice(0, 10).map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-28">
                    {new Date(day.signup_date).toLocaleDateString('ko-KR')}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div
                      className="bg-black rounded-full h-6 flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.min((day.total_signups / Math.max(...daily_trend.map((d) => d.total_signups))) * 100, 100)}%`,
                      }}
                    >
                      <span className="text-white text-xs font-medium">{day.total_signups}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
