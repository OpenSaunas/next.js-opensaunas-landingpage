import SocialSoloGrid from '../WhatWeDo/SocialSoloGrid';
const WhatWeDoSection = () => {
  return (
    <section
      className="
                w-full
                flex flex-row items-start
                px-4 min-[1080px]:px-10 py-0 min-[1080px]:py-[120px] gap-5 min-[1080px]:gap-[100px]
                bg-[#F3EFEA]
            "
    >
      {/* Sub Title */}
      <div
        className="
                    shrink-0 
                    w-20 min-[1080px]:w-[210px]
                    flex items-start justify-start
                "
      >
        <h2 className="text-[14px] min-[1080px]:text-[20px] font-reddit font-medium leading-1.61 tracking-[-0.02em] text-black wrap-break-word">
          What We Do
        </h2>
      </div>
      {/* Right Section Text */}
      <div
        className="
            flex-1 flex flex-col gap-20
        "
      >
        {/* Intro Text */}
        <div className="min-[1080px]:max-w-[580px] max-w-60">
          <p className="font-kopub-batang text-[22px] min-[1080px]:text-[26px] font-medium leading-[1.61] tracking-[-0.01em] text-black wrap-break-word">
            오픈사우나스는 현재 세부 프로그램과 일정, 그리고 특별한 콘텐츠를 준비하고 있습니다. 새로운 만남과 어울림을
            기대해주세요.
          </p>
        </div>

        <div className="hidden min-[1080px]:block">
          {' '}
          <SocialSoloGrid />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
