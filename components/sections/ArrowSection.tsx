import Image from 'next/image';

const ArrowSection = () => {
  return (
    <section className="flex">
      {/* Arrow */}
      <div className="flex justify-start items-center w-full pt-5 min-[1080px]:pt-0">
        <Image
          src="/img_arrow.png"
          alt="Arrow"
          width={58}
          height={118}
          className="w-[58px] h-[118px] min-[1080px]:w-[116px] min-[1080px]:h-[236px]"
        />
      </div>
    </section>
  );
};

export default ArrowSection;
