import Image from 'next/image';

const IllustSection = () => {
  return (
    <section className="w-full">
      {/* Image */}
      <Image
        src="/img_illust.png"
        alt="Illust Image"
        width={1440}
        height={909}
        className="w-full h-auto hidden min-[1080px]:block"
        priority
      />
      <Image
        src="/img_illust_mobile.png"
        alt="Illust Mobile Image"
        width={869}
        height={1207}
        className="w-full h-auto block min-[1080px]:hidden"
        priority
      />
    </section>
  );
};

export default IllustSection;
