import { Montserrat } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';
import Header from '../components/Header/Header';
import TopBanner from '../components/TopBanner';
import ContextLayout from './ContextLayout';
import Footer from '../components/Footer/Footer';
import { get_menu } from '../utils/get_menu';
import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Info from '../components/Info/Info';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--Montserrat',
});

// const bar_code = Libre_Barcode_39_Text({
//   subsets: ['latin'],
//   weight: '400',
//   variable: '--bar-code',
// });

export const metadata = {
  title: 'Flormar — Flormar Maroc Official Web Site ',
  description:
    "Le bon maquillage est le résultat d'un ensemble d'étapes, qui commence par le maquillage du teint, des yeux, des lèvres jusqu'au maquillage des ongles",
  keywords: [],
  // openGraph
  openGraph: {
    title: 'Flormar — Flormar Maroc Official Web Site ',
    description:
      "Le bon maquillage est le résultat d'un ensemble d'étapes, qui commence par le maquillage du teint, des yeux, des lèvres jusqu'au maquillage des ongles",
    // url: 'https://front.flormar.ma',
    url: 'https://v2.flormar.ma',
    siteName: 'Flormar — Flormar Maroc Official Web Site ',
    images: [
      {
        // url: 'https://front.flormar.ma/share.png', // Must be an absolute URL
        url: 'https://v2.flormar.ma/share.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        // url: 'https://front.flormar.ma/share.png', // Must be an absolute URL
        url: 'https://v2.flormar.ma/share.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Flormar — Flormar Maroc Official Web Site ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://flormar.ma'),

  twitter: {
    card: 'summary_large_image',
    site: '@eMartiiin94',
    title: 'Title webtsite',
    description: 'this is the desciption',
    images: [
      {
        // url: 'https://front.flormar.ma/share.png', // Must be an absolute URL
        url: 'https://v2.flormar.ma/share.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        // url: 'https://front.flormar.ma/share.png', // Must be an absolute URL
        url: 'https://v2.flormar.ma/share.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Flormar — Flormar Maroc Official Web Site ',
      },
    ],
  },
};

dynamic;
export default async function RootLayout({ params, children }) {
  const { categories, menu, tags } = await get_menu();

  return (
    <html lang='en'>
      {/* <link
        rel='preload'
        href='/icon/icons.svg'
        as='image'
        type='image/svg+xml'
        // fetchPriority='high'
      /> */}

      <body
        suppressHydrationWarning={true}
        className={`${montserrat.className}`}
      >
        <NextTopLoader />
        <Toaster position='top-right' />
        <TopBanner />
        <ContextLayout menu={menu}>
          <Header menu={menu || []} categories={categories} tags={tags || []} />
          {children}
        </ContextLayout>
        <div className='info-container'>
          <Info />
        </div>
        <Footer menu={menu} categories={categories} />
      </body>
    </html>
  );
}
