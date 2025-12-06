import { supabase } from './supabase';
import { EventPayloadMap } from '@/types/EventPayloadMap';

type EventName = keyof EventPayloadMap;

export class Analytics {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  private getTrafficSource(): string {
    if (typeof window === 'undefined') return 'unknown';

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const source = urlParams.get('source');

    if (utmSource) return utmSource;
    if (source) return source;

    const referrer = document.referrer;
    if (referrer) {
      try {
        return new URL(referrer).hostname;
      } catch {
        return 'referrer';
      }
    }
    return 'direct';
  }

  async trackEvent<N extends EventName>(eventName: N, eventData: EventPayloadMap[N]) {
    try {
      const { error } = await supabase.from('events').insert({
        session_id: this.sessionId,
        event_name: eventName,
        event_data: eventData || {},
      });

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // 가설 1: CTA 클릭률 추적 (목표 15~20%)
  async trackCtaClick() {
    await this.trackEvent('click_cta_join', {
      timestamp: new Date().toISOString(),
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
      traffic_source: this.getTrafficSource(),
    });
  }

  // 가설 2: 폼 제출률 추적 (목표 20%)
  async trackFormSubmit(email: string, isValid: boolean, success: boolean) {
    const emailDomain = email.includes('@') ? email.split('@')[1] : 'unknown';

    await this.trackEvent('submit_form_join', {
      email_domain: emailDomain,
      is_valid: isValid,
      success: success,
      timeStamp: new Date().toISOString(),
    });
  }

  // 가설 3: 유효 연락처 비율 추적 (목표 80%)
  async trackValidContact(email: string, isValid: boolean) {
    const emailDomain = email.includes('@') ? email.split('@')[1] : 'unknown';

    await this.trackEvent('valid_contact', {
      is_valid: isValid,
      email_domain: emailDomain,
      timeStamp: new Date().toISOString(),
    });
  }

  // 페이지 뷰 추적
  async trackPageView() {
    if (typeof window === 'undefined') return;

    await this.trackEvent('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
      traffic_source: this.getTrafficSource(),
      timestamp: new Date().toISOString(),
    });
  }

  // 입력 시작 추적 (추가 인사이트)
  async trackInputStart() {
    await this.trackEvent('input_start', {
      timestamp: new Date().toISOString(),
    });
  }

  // 체크박스 클릭 추적 (추가 인사이트)
  async trackCheckboxClick(isChecked: boolean) {
    await this.trackEvent('checkbox_click', {
      is_checked: isChecked,
      timestamp: new Date().toISOString(),
    });
  }
}

// 싱글톤 인스턴스
let analyticsInstance: Analytics | null = null;

export function getAnalytics(): Analytics {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics();
  }
  return analyticsInstance;
}
