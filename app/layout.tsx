import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// 폰트 import
import redditSans from './fonts/redditSans';
import ibmPlexSansKR from './fonts/ibmPlexSansKR';
import koPubBatang from './fonts/koPubBatang';
import koPubBatangPro from './fonts/koPubBatangPro';

export const metadata: Metadata = {
  title: 'Open Saunas | Local Wellness Curation',
  description: '로컬 사우나를 연결하고 회복 커뮤니티를 만드는 소셜 웰니스 플랫폼',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ko"
      className={`${redditSans.variable} ${ibmPlexSansKR.variable} ${koPubBatang.variable} ${koPubBatangPro.variable}`}
    >
      <body className="font-ibm bg-background text-foreground">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
