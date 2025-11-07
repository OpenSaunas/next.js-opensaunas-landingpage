import { Reddit_Sans_Condensed } from 'next/font/google';

const redditSans = Reddit_Sans_Condensed({
  subsets: ['latin'],
  variable: '--font-reddit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default redditSans;
