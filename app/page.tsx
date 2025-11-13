import InfoSection from '@/components/sections/InfoSection';
import HeroSection from '@/components/sections/HeroSection';
import MainImageSection from '@/components/sections/MainImageSection';
import AboutSection from '@/components/sections/AboutSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import SocialSoloTabs from '@/components/WhatWeDo/SocialSoloTabs';
import IllustSection from '@/components/sections/IllustSection';
import WaitListSection from '@/components/sections/WaitListSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <InfoSection />
      <MainImageSection />
      <AboutSection />
      <WhatWeDoSection />
      <div className="block min-[1080px]:hidden">
        <SocialSoloTabs />
      </div>
      <IllustSection />
      <WaitListSection />
    </div>
  );
}
