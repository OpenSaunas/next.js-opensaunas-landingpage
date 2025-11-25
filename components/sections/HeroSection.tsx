import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col w-full items-start px-4 min-[1080px]:px-10 pt-2.5 min-[1080px]:pt-5 pb-48 min-[1080px]:pb-[400px] bg-[#F3EFEA]">
      {/* Text */}
      <div
        className="font-reddit font-normal text-black
        w-full h-[380px] 
        leading-[1.06] tracking-[-0.02em] wrap-break-word
        text-[clamp(36px,4vw,76px)]
        "
      >
        Open Saunas is a social wellness project reviving Korean local saunas as places for everyday recovery and
        genuine connection. We&apos;re creating a new culture of rest, beginning right where we live.
      </div>
      {/* Image */}
      <div className="absolute bottom-0 right-0 flex justify-end items-end">
        {/* 모바일 이미지 */}
        <Image
          src="/img_house_mobile.png"
          alt="Hero Image"
          width={350}
          height={350}
          className="block min-[1080px]:hidden w-[350px] h-[350px] object-contain"
          priority
        />

        {/* 데스크톱 이미지 */}
        <Image
          src="/img_house.png"
          alt="Hero Image"
          width={710}
          height={710}
          className="hidden min-[1080px]:block w-[710px] h-[710px] object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
