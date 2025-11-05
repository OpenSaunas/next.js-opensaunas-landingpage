import InfoSection from '@/components/sections/InfoSection';
import HeroSection from '@/components/sections/HeroSection';
import MainImageSection from '@/components/sections/MainImageSection';
import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <InfoSection />
      <MainImageSection />
      <AboutSection />
    </div>
  );
}
