import { Reddit_Sans_Condensed } from 'next/font/google';

const redditSans = Reddit_Sans_Condensed({
  subsets: ['latin'],
  variable: '--font-reddit',
  weight: ['300', '500', '700'],
  display: 'swap',
});

export default redditSans;
