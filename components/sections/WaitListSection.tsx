'use client';
import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import clsx from 'clsx';
import { supabase } from '@/lib/supabase';
import { getAnalytics } from '@/lib/analytics';

const WaitListSection = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasTrackedInput, setHasTrackedInput] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const analytics = useRef(getAnalytics());

  // 컴포넌트 마운트 시 페이지 뷰 추적
  useEffect(() => {
    analytics.current.trackPageView();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // 첫 입력 시 한 번만 추적
    if (!hasTrackedInput && newEmail.length > 0) {
      analytics.current.trackInputStart();
      setHasTrackedInput(true);
    }

    if (showEmailError) setShowEmailError(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    // 체크박스 클릭 추적
    analytics.current.trackCheckboxClick(checked);

    if (showCheckboxError) setShowCheckboxError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 가설 1: CTA 클릭 추적 (Submit 버튼 클릭)
    await analytics.current.trackCtaClick();

    // --- 1. Validation ---
    let hasError = false;

    // 가설 3: 유효 연락처 비율 추적
    await analytics.current.trackValidContact(email, isEmailValid);

    if (!isEmailValid) {
      setShowEmailError(true);
      hasError = true;
    }

    if (!isChecked) {
      setShowCheckboxError(true);
      hasError = true;
    }

    if (hasError) {
      // 검증 실패 시에도 추적
      await analytics.current.trackFormSubmit(email, isEmailValid, false);
      return;
    }

    // --- 2. Supabase 저장 ---
    try {
      const trafficSource =
        sessionStorage.getItem('traffic_source') ||
        new URLSearchParams(window.location.search).get('utm_source') ||
        (document.referrer ? new URL(document.referrer).hostname : 'direct');

      const { data, error } = await supabase.from('waitlist').insert({
        email,
        is_agreed: isChecked,
        created_at: new Date().toISOString(),
        clicked_cta: true,
        submitted_at: new Date().toISOString(),
        traffic_source: trafficSource,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        session_id: sessionStorage.getItem('session_id'),
      });

      if (error) {
        console.error('Supabase Insert Error:', error);

        // 가설 2: 폼 제출 실패 추적
        await analytics.current.trackFormSubmit(email, isEmailValid, false);

        alert('서버 저장 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.');
        return;
      }

      console.log(data);

      // 가설 2: 폼 제출 성공 추적
      await analytics.current.trackFormSubmit(email, isEmailValid, true);

      // --- 3. 성공 처리 ---
      setShowSuccessModal(true);
      setEmail('');
      setIsChecked(false);
      setShowEmailError(false);
      setShowCheckboxError(false);
      setHasTrackedInput(false);
    } catch (err) {
      console.error('Unexpected Submit Error:', err);

      // 예외 발생 시에도 추적
      await analytics.current.trackFormSubmit(email, isEmailValid, false);

      alert('알 수 없는 오류가 발생했습니다.');
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <section
        className="
                flex flex-col items-center justify-center w-full
                px-4 pt-[60px] pb-[100px] gap-20
                min-[1080px]:px-10 min-[1080px]:py-[120px]
                bg-[#F3EFEA]
                "
      >
        {/* Contents */}
        <div
          className="
                        flex flex-col items-center w-full gap-10 min-[1080px]:gap[60px]"
        >
          <h2
            className=" 
                            hidden min-[1080px]:block font-kopub-batang-pro font-medium text-[22px] min-[1080px]:text-[28px] leading-[1.61] tracking-[-0.02em] text-black text-center wrap-break-word"
          >
            오픈사우나스와 함께하고 싶다면? <br />
            메일을 남겨주세요. 가장 먼저 소식을 전해드릴게요.
          </h2>
          <h2
            className=" 
                            block min-[1080px]:hidden font-kopub-batang-pro font-medium text-[22px] min-[1080px]:text-[28px] leading-[1.61] tracking-[-0.02em] text-black text-center wrap-break-word"
          >
            오픈사우나스와 함께하고 싶다면? <br />
            메일을 남겨주세요. 가장 먼저
            <br />
            소식을 전해드릴게요.
          </h2>
          {/* Email Area */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full justify-center items-center gap-[26px] min-[1080px]:gap-2.5 px-[60px] min-[1080px]:px-0 py-2 min-[1080px]:py-0"
          >
            <div className="flex flex-row w-full justify-center items-center gap-[26px]">
              <div className="relative w-full max-w-[400px]">
                <label
                  htmlFor="email"
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isFocused || email
                      ? '-top-6 text-sm text-black/60'
                      : 'top-0 text-[14px] min-[1080px]:text-[22px] text-black font-reddit font-normal'
                  }`}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent border-b border-black text-[14px] min-[1080px]:text-[22px] font-reddit font-normal outline-none text-black  transition-all duration-300
                ${showEmailError ? 'border-red-500' : 'border-black focus:border-black/80'}"
                />
                <p
                  className={clsx(
                    'text-red-500 text-xs font-ibm transition-all duration-300 overflow-hidden',
                    showEmailError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                  )}
                >
                  올바른 이메일 주소를 입력해주세요.
                </p>
              </div>
              <div className="hidden min-[1080px]:block">
                <Button type="submit">Join WaitList</Button>
              </div>
            </div>

            {/* Checkbox Section */}
            <div className="flex flex-col items-center justify-center gap-2">
              <label className="relative flex items-center justify-center gap-2 min-[1080px]:gap-3 cursor-pointer group">
                {/* 체크박스 */}
                <div className="relative shrink-0 flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="appearance-none w-3.5 h-3.5 min-[1080px]:w-[18px] min-[1080px]:h-[18px] border cursor-pointer 
                 checked:bg-black transition-[border-color] duration-200 border-black group-hover:border-black/70"
                  />
                  {isChecked && (
                    <svg
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* 약관 텍스트 */}
                <span
                  className="font-ibm text-[14px] min-[1080px]:text-[18px] leading-[1.61] tracking-[-0.02em] 
               transition-colors text-black group-hover:text-black/70"
                >
                  개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
              {/* Privacy Notice */}
              <p className="font-ibm text-[12px] max-w-[220px] min-[1080px]:max-w-none text-[#9C9C9C] leading-[1.61] tracking-[-0.02em] wrap-break-word text-center">
                개인정보는 이벤트 안내 외 다른 용도로 사용되지 않으며, 3개월 후 즉시 삭제됩니다.
              </p>
              <p
                className={clsx(
                  'text-red-500 text-xs font-ibm transition-all duration-300 overflow-hidden',
                  showCheckboxError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                )}
              >
                약관에 동의해주세요.
              </p>
            </div>
            <div className="block min-[1080px]:hidden">
              <Button type="submit">Join WaitList</Button>
            </div>
          </form>
          <Image src="/img_logo.png" alt="OpenSaunas Logo" width={280} height={208} className="w-auto h-auto" />
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="flex flex-col gap-2.5 bg-[#FEFEFA] rounded-3xl px-3 py-3 max-w-[75%] min-[1080px]:max-w-[600px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[38px]">
              <div className="flex flex-col gap-2.5">
                {/* X Button */}
                <button
                  aria-label="Close modal"
                  onClick={closeModal}
                  className="
                    absolute top-1.5 right-1.5
                    flex items-center justify-center
                    w-5 h-5
                    border-none
                  text-[#343330]
                  hover:bg-black/5 hover:text-black
                    transition
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Text */}
                <div className="flex flex-col gap-2 px-3 min-[1080px]:px-[52px]">
                  <h3 className="font-ibm font-medium text-[20px] min-[1080px]:text-[24px] leading-[1.65] tracking-[-0.02em] text-black text-center">
                    신청이 완료되었습니다.
                  </h3>
                  <p className="font-ibm text-[12px] min-[1080px]:text-[16px] leading-[1.65] tracking-[-0.02em] text-[#4D4D4D] text-center">
                    사전 설문에 참여하시면 추첨을 통해 스타벅스 <br />
                    기프티콘을 보내드립니다.
                  </p>
                </div>
                <Image
                  src="/img_survey.png"
                  alt="Survey Image"
                  width={391}
                  height={1207}
                  className="w-auto h-auto"
                  priority
                />
              </div>
            </div>

            {/* Close Button */}
            <a
              href="https://forms.gle/jduD6QzaZV4gHtFQ6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeModal}
              className="block text-center w-full
              bg-black text-white font-ibm font-semibold
                text-[14px] min-[1080px]:text-[18px]
                py-2 rounded-[200px]
              hover:bg-black/90 transition-all duration-200
                hover:scale-[1.02] active:scale-95"
            >
              1분 설문 시작하기
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitListSection;
