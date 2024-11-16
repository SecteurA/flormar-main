import React, { useContext, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { Context } from '../ContextLayout';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../../components/Icon';

const ProductFilter = ({ product, gift = '', setShowGift }) => {
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

  const { wishes, setWishes } = useContext(Context);

  return (
    <div className='Product'>
      <Link href={`/product/${product?.slug}?sku=${product?.sku}`} shallow>
        <div className='Product-container'>
          <a>
            <button
              className={`heart ${wishes[product?.id] ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWishes((w) => {
                  let new_w = { ...w };
                  if (new_w[product?.id]) delete new_w[product?.id];
                  else new_w[product?.id] = 1;
                  return new_w;
                });
              }}
            >
              <Icon name={'heart'} />
            </button>

            <button
              className={`product-bag ${cart?.[product?.sku] ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (gift) {
                  localStorage.setItem(
                    'gift',
                    JSON.stringify({
                      product_id: product?.id,
                      rule_id: gift,
                      quantity: 1,
                      sku: '',
                      variations: [],
                    })
                  );
                  setShowCart(Math.random());
                  setShowGift(false);
                } else {
                  addToCart(
                    product?.id,
                    cart?.[product?.sku]?.count || 1,
                    product?.sku
                  );
                  setShowCart(true);
                }
              }}
            >
              <Icon name={'add-bag'} />
            </button>
          </a>
          <Image
            height={400}
            width={320}
            alt=''
            src={product?.images?.[0]}
            priority='true'
            // fetchPriority='high'
          />
          <Image
            height={400}
            width={320}
            alt=''
            className='hidden'
            src={product?.images?.[2] || product?.images?.[0]}
            priority='true'
            // fetchPriority='high'
          />
        </div>
        <div style={{ textAlign: 'left' }}>
          <h3 dangerouslySetInnerHTML={{ __html: product?.name }}></h3>
          <strong>
            <h3 dangerouslySetInnerHTML={{ __html: product?.price_html }}></h3>
          </strong>
        </div>
      </Link>
      <div className='colors'>
        {/* Variation colors */}
        {product?.variations
          // ?.slice(0, 4)
          ?.filter((_, id) => id <= 4)
          ?.map((c, j) => (
            <Link
              href={`/product/${product?.slug}?sku=${c?.sku}`}
              shallow
              key={j}
              style={{
                background:
                  // `url(${c?.images?.[0]})` ||
                  // `url(${c?.main_image})` ||
                  '#eee',
              }}
            >
              {(c?.images?.[0] || c?.main_image) && (
                <Image
                  className='swatch-image-color'
                  src={c?.images?.[0] || c?.main_image}
                  alt='swatch color'
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative',
                    borderRadius: '50%',
                    objectFit: 'none',
                  }}
                  height={20}
                  width={20}
                  priority='true'
                  // fetchPriority='high'
                />
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductFilter;
