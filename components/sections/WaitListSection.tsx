'use client';
import { useState } from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import clsx from 'clsx';

const WaitListSection = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isEmailValid && isChecked;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid) {
      setShowEmailError(true);
      if (!isChecked) {
        setShowCheckboxError(true);
      }
      return;
    }
    if (!isChecked) {
      setShowCheckboxError(true);
      return;
    }
    // 성공 처리
    console.log('Submitted email:', email);
    setShowSuccessModal(true);
    setEmail('');
    setIsChecked(false);
    setShowEmailError(false);
    setShowCheckboxError(false);
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (showEmailError) setShowEmailError(false);
                  }}
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
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                      if (showCheckboxError) setShowCheckboxError(false);
                    }}
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
          <Image
            src="/img_logo.png"
            alt="OpenSaunas Logo"
            width={280}
            height={208}
            className="min-[1080px]:w-[440px] min-[1080px]:h-[336px]"
          />
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-[#F3EFEA] rounded-3xl px-8 py-10 min-[1080px]:px-12 min-[1080px]:py-14 max-w-[90%] min-[1080px]:max-w-[600px] shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 min-[1080px]:w-20 min-[1080px]:h-20 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 min-[1080px]:w-12 min-[1080px]:h-12 text-[#F3EFEA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h3 className="font-kopub-batang-pro font-medium text-[22px] min-[1080px]:text-[28px] leading-[1.61] tracking-[-0.02em] text-black text-center mb-4">
              신청이 완료되었습니다!
            </h3>
            <p className="font-ibm text-[14px] min-[1080px]:text-[16px] leading-[1.61] tracking-[-0.02em] text-black/70 text-center mb-8">
              입력하신 이메일로 오픈사우나스의 소식을 <br />
              가장 먼저 전해드리겠습니다.
            </p>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full bg-black text-white font-ibm font-medium text-[16px] min-[1080px]:text-[18px] py-3 min-[1080px]:py-4 rounded-full hover:bg-black/90 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitListSection;
