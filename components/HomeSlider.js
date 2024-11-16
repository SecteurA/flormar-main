'use client';
import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import Image from 'next/image';
import Link from 'next/link';

function HomeSlider({ sliders }) {
  if (sliders)
    return (
      <div className='HomeSlider '>
        <Swiper
          pagination={true}
          navigation={true}
          spaceBetween={40}
          modules={[Pagination, Navigation]}
        >
          {Object.values(sliders)?.map((s, i) =>
            s ? (
              <SwiperSlide key={i}>
                {/* <Link href={s?.url || ''}> */}
                <Link
                  href={
                    new URL(s?.url)?.pathname + new URL(s?.url)?.search || ''
                  }
                >
                  <Image
                    priority='false'
                    height={500}
                    width={1220}
                    src={s?.img?.url}
                    alt=''
                  />

                  <Image
                    height={300}
                    width={200}
                    src={s?.mobile_img?.url}
                    style={{ minHeight: 200 }}
                    alt=''
                    priority='false'
                    className='min'
                  />
                </Link>
              </SwiperSlide>
            ) : (
              <Fragment key={i} />
            )
          )}
        </Swiper>
      </div>
    );
}

export default HomeSlider;
