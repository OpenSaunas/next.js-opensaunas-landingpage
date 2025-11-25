import localFont from 'next/font/local';

const koPubBatangPro = localFont({
  src: [
    {
      path: '../../public/fonts/KoPub Batang_Pro Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KoPub Batang_Pro Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KoPub Batang_Pro Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kopub-batang-pro',
});

export default koPubBatangPro;
