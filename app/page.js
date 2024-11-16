import Image from 'next/image';
import HomeSlider from '../components/HomeSlider';

import Chosen from '../components/Chosen/Chosen';
import FlexCategories from '../components/FlexCategories/FlexCategories';
import { wp_json } from '../utils/wp_json';
import { wc_json } from '../utils/wc_json';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Info from '../components/Info/Info';
import { product } from '../utils/product';

dynamic;
export default async function Home() {
  let data = await wp_json('wp/v2/extra_images').then((data) => {
    if (data?.length > 0) return data[0]?.acf;
  });
  const {
    'list-banners': sliders,
    categories_by_images,
    collections: categories,
  } = data || {};
  const products = await product({
    page: 1,
    params: {
      tag: 4163,
    },
    per_page: 100,
    link: false,
  }).catch((err) => console.log(err));

  if (sliders)
    return (
      <main className='home-page'>
        <HomeSlider {...{ sliders }} />
        <div className='container'>
          <FlexCategories categories={categories} />
        </div>
        <Chosen title={'Meilleures ventes'} products={products || []} />
        <div className='container'>
          <div className='flex-imgs'>
            {Object.values(categories_by_images || {})?.map((c, i) => (
              <Link
                href={new URL(c?.url)?.pathname + new URL(c?.url)?.search || ''}
                key={i}
              >
                <Image
                  height={300}
                  width={500}
                  src={c?.img?.url}
                  alt=''
                  priority='true'
                />
              </Link>
            ))}
          </div>
        </div>
        <Info />
        <div className='flex-end'>
          <div className='item'>
            <div>
              <h3>Le monde coloré de Flormar Extra !</h3>
              <p>
                Inscrivez-vous dès maintenant pour bénéficier de privilèges.
              </p>
              <Link href={'/auth'}>S'inscrire</Link>
            </div>
            <img
              src='/images/flormar-extra-news.jpg'
              alt='flormar extra news'
            />
          </div>
          <div className='item'>
            <div>
              <h3>Magasins</h3>
              <Link href={'/magasins'}>Trouver le magasin le plus proche</Link>
            </div>
            <img
              src='/images/flormar-store-image-1536x929.jpg'
              alt='Trouver le magasin le plus proche'
            />
          </div>
        </div>
      </main>
    );
}
