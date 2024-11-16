import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from '../ContextLayout';
import axios from 'axios';
import Image from 'next/image';
import Icon from '../../components/Icon';
import Counter from '../../components/Counter/Counter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';

function ChechoutRight({ selected, setValue, getValues, watch }) {
  const {
    cart,
    addToCart,
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

  const [ShowCart, setShowCart] = useState();

  const router = useRouter();
  useEffect(() => {
    if (ProductsCart && Object.values(cart)?.length > 0) {
      setValue(
        'line_items',
        ProductsCart.map((p) => ({
          product_id: p?.id, // Replace with your product ID
          quantity: p?.count,
        }))
      );
    } else router.push('/');
  }, [ProductsCart]);

  useEffect(() => {}, [watch('billing.city')]);

  const Coupon =
    Number(watch('coupon_lines')?.minimum_amount || 0) <= total
      ? watch('coupon_lines')?.discount_type === 'percent'
        ? (Number(total) * Number(watch('coupon_lines')?.amount || 0)) / 100
        : Number(watch('coupon_lines')?.amount || 0)
      : 0;

  const Shipping = Number(watch('shipping_lines')?.[0]?.total || 0);

  const Total = (Number(total) - Number(Coupon) + Number(Shipping))?.toFixed(2);

  return (
    <div className='right'>
      <div className={`container ${ShowCart ? 'active' : ''}`}>
        <h1 onClick={() => setShowCart((c) => !c)}>
          Ma Commande <span>{items_length}</span>
          <div>
            <Icon name={'chevron-down'} />
          </div>
        </h1>
        <div className='products'>
          {LoadingCart && items_length <= 0 && (
            <div className='item'>
              <Link href='/'>
                <img src={'/loading.gif'} alt='' />
              </Link>
              <div className='body'> </div>
            </div>
          )}
          {ProductsCart &&
            ProductsCart?.map((p, i) => (
              <div className='item'>
                <Link href={`/product/${p?.slug}?sku=${p?.sku_cart}`}>
                  <Image
                    height={200}
                    width={200}
                    src={
                      p?.variations?.find((v) => v?.sku === p?.sku_cart)
                        ?.main_image ||
                      p?.variations?.find((v) => v?.sku === p?.sku_cart)
                        ?.images?.[-1] ||
                      p?.images?.[0]
                    }
                    alt=''
                  />
                </Link>

                <div>
                  <p>{p?.name}</p>
                  <p>Sku: {p?.sku_cart}</p>
                  <span
                    dangerouslySetInnerHTML={{ __html: p?.price_html }}
                  ></span>
                  <div className='flex'>
                    <Counter
                      {...{
                        count: p?.count,
                        setcount: (count) =>
                          addToCart(p?.id, count, p?.sku_cart),
                      }}
                    />
                    <button
                      className='close'
                      onClick={() => {
                        removeFromCart(p?.sku_cart);
                      }}
                    >
                      <Icon name={'trash'} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='line'></div>

        <div className='flex'>
          <span>Sous-total</span> <span> {total?.toFixed(2)} dh</span>
        </div>
        <div className='flex' style={{ marginTop: 14 }}>
          <span>Expédition</span> <span>{Shipping || '0.00'} dh</span>
        </div>
        <div className='flex' style={{ marginTop: 14 }}>
          <span>Code Promo</span>
          <span>{watch('coupon_lines')?.code}</span>
          <span>
            <span>-{Coupon?.toFixed(2) || '0.00'}</span> dh
          </span>
        </div>
        <div className='line' style={{ marginTop: 20 }}></div>
        <div
          className='flex total'
          style={{ marginTop: 10, paddingBottom: 14 }}
        >
          <span>Total</span> <span> {Total} dh</span>
        </div>

        {/* {selected > 1 && (
          <div className='buttom' onClick={createOrder}>
            <button>Check out</button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ChechoutRight;
