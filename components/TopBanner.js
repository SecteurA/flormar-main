import React from 'react';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import { wp_json } from '../utils/wp_json';
import Icon from './Icon';
import Link from 'next/link';

async function TopBanner() {
  let data = await wp_json('wp/v2/extra_images').then((data) => {
    if (data?.length > 0 && data[0]?.acf) return data[0]?.acf;
  });

  return (
    <div className='top'>
      <div className='banner'>
        <Image
          priority={!isMobile}
          height={100}
          width={1200}
          src={data?.img?.url}
          alt=''
        />
        <Image
          priority={isMobile}
          className='mobile'
          height={100}
          width={600}
          src={data?.mobile_img?.url}
          alt=''
        />
      </div>
      <div style={{ background: '#dddddd' }}>
        <div className='container' style={{ height: 30 }}>
          <button>
            <Link href={'/magasins'} className='lang'>
              Magasins
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
