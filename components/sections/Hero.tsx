import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative flex flex-col w-full items-start px-4 min-[1080px]:px-10 pt-2.5 min-[1080px]:pt-5 pb-20 min-[1080px]:pb-[400px] bg-[#F3EFEA]">
      {/* Text */}
      <div
        className="font-reddit font-light text-black
        w-full h-[380px] 
        leading-[1.06] tracking-[-0.02em] wrap-break-word
        text-[clamp(32px,4vw,76px)]
        "
      >
        Open Saunas is a social wellness project reviving Korean local saunas as places for everyday recovery and
        genuine connection. We&apos;re creating a new culture of rest, beginning right where we live.
      </div>
      {/* Image */}
      <div className="absolute bottom-0 right-0 flex justify-end items-end">
        <Image
          src="/img_house.png"
          alt="Hero Image"
          width={350}
          height={350}
          className="w-[350px] h-[350px] min-[1080px]:w-[710px] min-[1080px]:h-[710px] object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
