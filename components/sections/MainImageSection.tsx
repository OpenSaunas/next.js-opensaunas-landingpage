import Image from 'next/image';

const MainImageSection = () => {
  return (
    <section className="w-full">
      {/* Image */}
      <Image src="/img_main.png" alt="Main Image" width={1440} height={810} className="w-full h-auto" />
    </section>
  );
};

export default MainImageSection;
