import Image from 'next/image';
import React, { Fragment } from 'react';
import './FlexCategories.css';
import Link from 'next/link';

function FlexCategories({ categories, route = '' }) {
  return (
    <div className='container' style={{ margin: 0 }}>
      <div className='FlexCategories' style={{ minWidth: '100%' }}>
        {Object.values(categories || {})?.map((c, i) => (
          <Link
            href={
              c?.slug
                ? `${route}/${decodeURIComponent(c?.slug)}` || '/'
                : `${new URL(c?.url)?.pathname + new URL(c?.url)?.search}` || ''
            }
            key={i}
          >
            <Image
              priority='true'
              height={160}
              width={300}
              src={c?.img?.url}
              alt='category'
            />
            <p>{c?.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FlexCategories;
