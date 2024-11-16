'use client';
import React, { useContext } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import Icon from '../Icon';
import './Chosen.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Context } from '../../app/ContextLayout';
import { useCart } from '../../hooks/useCart';

function Chosen({ products, loading = false, title }) {
  const router = useRouter();
  const { wishes, setWishes } = useContext(Context);
  const {
    cart,
    addToCart,
    ShowCart,
    setShowCart,
    removeFromCart,
    ProductsCart,
    LoadingCart,
    total,
    items_length,
    setLoadingCart,
    CartData,
    Gifts,
    getGifts,
  } = useContext(Context);

  return (
    <div className='Chosen'>
      <div className='container'>
        <h2>
          {title}
          <Icon name={'chosen'} />
        </h2>
      </div>
      <div className='container'>
        <div className='swiper-container'>
          <Swiper
            slidesPerView={'auto'}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              enabled: true,
            }}
            modules={[Pagination, Navigation]}
            spaceBetween={0}
          >
            {products?.map((p, i) => (
              <SwiperSlide key={i}>
                <div key={i} className='Product'>
                  <Link href={`/product/${p?.slug}?sku=${p?.sku}`}>
                    <div className='product-image'>
                      <a>
                        <button
                          className={`heart ${wishes[p?.id] ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setWishes((w) => {
                              let new_w = { ...w };
                              if (new_w[p?.id]) delete new_w[p?.id];
                              else new_w[p?.id] = 1;
                              return new_w;
                            });
                          }}
                        >
                          <Icon name={'heart'} />
                        </button>

                        <button
                          className={`product-bag ${
                            cart?.[p?.sku] ? 'active' : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            addToCart(
                              p?.id,
                              cart?.[p?.sku]?.count || 1,
                              p?.sku
                            );
                            setShowCart(true);
                          }}
                        >
                          <Icon name={'add-bag'} />
                        </button>
                      </a>
                      <Image
                        priority='true'
                        height={300}
                        width={200}
                        alt=''
                        src={p?.images?.[0]}
                      />
                      <Image
                        priority='true'
                        height={300}
                        width={200}
                        alt=''
                        className='hidden'
                        // src={p?.img[1]}
                        src={p?.images?.[2] || p?.images?.[3] || p?.images?.[0]}
                      />
                    </div>
                    <div className='line'></div>
                    <h3 dangerouslySetInnerHTML={{ __html: p?.name }}></h3>
                    <div className='colors'>
                      {p?.variations_colors?.slice(0, 5)?.map((c, j) => (
                        <Link
                          href={`/product/${p?.slug}?sku=${c?.sku}`}
                          shallow
                          key={j}
                          style={{ background: c?.color_hex || '#eee' }}
                        ></Link>
                      ))}
                    </div>
                    <h3
                      className='price'
                      dangerouslySetInnerHTML={{ __html: p?.price_html }}
                    ></h3>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            {loading &&
              [1, 2, 3, 4].map((p, i) => (
                <SwiperSlide key={'k' + i}>
                  <div className='product-image'>
                    <img src='/loading.gif' />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
        </div>
      </div>
    </div>
  );
}

export default Chosen;
