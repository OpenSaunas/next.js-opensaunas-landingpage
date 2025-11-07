'use client';
import { useState } from 'react';
import Divider from '../common/Divider';
import Image from 'next/image';

type TabType = 'social' | 'solo';

const SocialSoloTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('social');

  return (
    <div className="flex justify-center px-4 pt-[30px] pb-[60px] bg-[#F3EFEA]">
      <div className="flex flex-1 max-w-[840px] py-[30px] rounded-[30px] bg-[#E6DFD6]">
        <div className="flex flex-col items-center w-full gap-[19px]">
          {/* Tabs */}
          <div className="flex flex-col items-center w-full gap-4 px-[46px]">
            <div className="flex flex-row w-[342px] px-[30px] items-center justify-center">
              <button
                onClick={() => setActiveTab('social')}
                className={`relative w-[110px] font-reddit font-semibold text-[36px] leading-[1.34] tracking-[-0.02em] text-black wrap-break-word transition-all duration-300 ease-in-out ${activeTab === 'social' ? 'hover:cursor-default' : 'hover:cursor-pointer'} group`}
              >
                <span
                  className={`${activeTab === 'social' ? 'text-black' : 'text-black/20 group-hover:text-black/50'} transition-colors duration-300`}
                >
                  Social
                </span>
                {activeTab === 'social' && (
                  <Image
                    src="/img_divider.svg"
                    alt="brush divider"
                    width={86}
                    height={4}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('solo')}
                className={`relative w-[110px] font-reddit font-semibold text-[36px] leading-[1.34] tracking-[-0.02em] text-black wrap-break-word transition-all duration-300 ease-in-out ${activeTab === 'solo' ? 'hover:cursor-default' : 'hover:cursor-pointer'} group`}
              >
                <span
                  className={`${activeTab === 'solo' ? 'text-black' : 'text-black/20 group-hover:text-black/50'} transition-colors duration-300`}
                >
                  Solo
                </span>
                {activeTab === 'solo' && (
                  <Image
                    src="/img_divider.svg"
                    alt="brush divider"
                    width={86}
                    height={4}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
                  />
                )}
              </button>
            </div>
            <div className="w-[246px] text-center">
              <p className="font-ibm text-[14px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
                심리, 창작, 로컬 문화의 이야기를 전해줄 인물과 함께하는 사우나
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full px-[30px] gap-8 ">
            {activeTab === 'social' && (
              <div className="flex flex-col gap-5 w-[300px]">
                {[
                  ['Opening Talk', '삶과 일, 그리고 ‘쉬는 법’에 대해 새로운 시선으로 듣는 이야기'],
                  ['Sauna Dialogue', '연사와 참가자가 함께 진솔하게 대화하는 시간'],
                  ['Cool Down & Tea', '생각돋 열기도 마무리하는 시간'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex flex-col gap-2.5 h-[138px]">
                    <p className="text-[12px] font-reddit font-normal leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                      Step {i + 1}
                    </p>
                    <Divider />
                    <p className="font-reddit text-[24px] font-medium leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                      {title}
                    </p>
                    <p className="font-ibm text-[16px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'solo' && (
              <div className="flex flex-col gap-5 w-[300px]">
                {[
                  ['Aroma Selection', '입장 전, 오늘의 향을 고르는 시간'],
                  ['Private Sauna', '휴대폰도, 대화도 없이 오직 열기와 호흡으로 나를 느끼는 시간'],
                  ['Cool Down & Tea', '오늘의 감정을 조용히 정리하는 시간'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex flex-col gap-2.5 h-[138px]">
                    <p className="text-[12px] font-reddit font-normal leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                      Step {i + 1}
                    </p>
                    <Divider />
                    <p className="font-reddit text-[24px] font-medium leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                      {title}
                    </p>
                    <p className="font-ibm text-[16px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSoloTabs;
