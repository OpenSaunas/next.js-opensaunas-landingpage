import localFont from 'next/font/local';

const koPubBatang = localFont({
  src: [
    {
      path: '../../public/fonts/KoPub Batang Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KoPub Batang Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KoPub Batang Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kopub-batang',
  display: 'swap',
});

export default koPubBatang;
