import InfoTextSection from './InfoTextSection';
import ArrowSection from './ArrowSection';

const InfoSection = () => {
  return (
    <section className="relative flex flex-col bg-[#F3EFEA]">
      {/* Arrow */}
      <ArrowSection />
      {/* Text */}
      <InfoTextSection />
    </section>
  );
};

export default InfoSection;
