import Image from 'next/image';

const IllustSection = () => {
  return (
    <section className="w-full">
      {/* Image */}
      <Image src="/img_illust.png" alt="Illust Image" width={1440} height={909} className="w-full h-auto" />
    </section>
  );
};

export default IllustSection;
