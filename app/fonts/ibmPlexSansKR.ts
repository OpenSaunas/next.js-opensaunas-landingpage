import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['300', '500', '700'],
  display: 'swap',
});

export default ibmPlexSansKR;
