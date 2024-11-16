'use client';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Cart.css';
import Icon from '../Icon';
import Link from 'next/link';
import Counter from '../Counter/Counter';
import Gift from '../Gift/Gift';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import Image from 'next/image';
import axios from 'axios';
import { Context } from '../../app/ContextLayout';

function Cart() {
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

  const [ShowGift, setShowGift] = useState(false);

  return (
    <>
      <button
        title='cart'
        className='show-cart'
        onClick={() => setShowCart(true)}
      >
        <Icon name={'bag'} />
        <span>{CartData?.cart_contents_count}</span>
      </button>
      {ShowCart && (
        <div className='Cart'>
          <div className='overlay' onClick={() => setShowCart(false)}></div>
          <div className='Cart-Container'>
            <div className='top'>
              <h4>Produits ({CartData?.cart_contents_count}) </h4>
              <button onClick={() => setShowCart(false)}>
                <Icon name={'close'} />
              </button>
            </div>
            <div className='products'>
              {CartData?.products?.length > 0 ? (
                CartData?.products?.map((prod, i) => {
                  const p = ProductsCart?.find(
                    (pr) => prod?.product_id?.toString() === pr?.id?.toString()
                  );

                  return (
                    <div key={i} className='product'>
                      <Link
                        onClick={() => setShowCart(false)}
                        href={`/product/${p?.slug || prod?.slug}?sku=${
                          p?.sku_cart || prod?.sku
                        }`}
                      >
                        <Image
                          height={400}
                          width={400}
                          src={
                            p?.variations?.find((v) => v?.sku === p?.sku_cart)
                              ?.main_image || prod?.image
                          }
                          alt=''
                        />
                      </Link>
                      <div className='body'>
                        <h5
                          dangerouslySetInnerHTML={{
                            __html: p?.name || prod?.name,
                          }}
                        ></h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              (
                                p?.short_description || prod?.short_description
                              )?.slice(0, 50) + '...',
                          }}
                        ></p>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              (p?.description || prod?.description)?.slice(
                                0,
                                50
                              ) + '...',
                          }}
                        ></span>
                        {p?.stock_status !== 'Out of stock' ? (
                          prod?.price > 0 ? (
                            <div className='flex'>
                              <Counter
                                {...{
                                  count: p?.count,
                                  setcount: (count) =>
                                    addToCart(
                                      p?.id,
                                      count,
                                      p?.sku_cart,
                                      prod?.product_data?.variation_id
                                    ),
                                }}
                              />
                              {/* <h2
                          dangerouslySetInnerHTML={{
                            __html: p?.price_html,
                          }}
                        ></h2> */}
                              <h2>
                                {prod?.price - p?.price !== 0 && (
                                  <del>
                                    <span className='woocommerce-Price-amount amount'>
                                      <bdi>
                                        {p?.price}
                                        <span className='woocommerce-Price-currencySymbol'>
                                          Dh
                                        </span>
                                      </bdi>
                                    </span>
                                  </del>
                                )}
                                &nbsp;
                                <ins>
                                  <span className='woocommerce-Price-amount amount'>
                                    <bdi>
                                      {prod?.price}
                                      <span className='woocommerce-Price-currencySymbol'>
                                        Dh
                                      </span>
                                    </bdi>
                                  </span>
                                </ins>
                              </h2>
                            </div>
                          ) : (
                            <div>
                              <p
                                className='cadeau'
                                onClick={() => {
                                  setShowGift(true);
                                }}
                              >
                                {prod?.quantity || 1} x cadeau
                                <svg className='icon'>
                                  <use href='/icon/gift.svg#icon'></use>
                                </svg>
                              </p>
                            </div>
                          )
                        ) : (
                          <p className='not-available'>Produit en rupture</p>
                        )}
                        {!prod?.product_data?.ywdpd_is_gift_product && (
                          <button
                            className='close'
                            onClick={() => {
                              removeFromCart(p?.sku_cart);
                            }}
                          >
                            <Icon name={'trash'} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <img
                  src='/images/empty-cart.png'
                  style={{ width: '100%', margin: 'auto' }}
                />
              )}

              {LoadingCart && (
                <div className='product'>
                  <Link href='/'>
                    <img src={'/loading.gif'} alt='' />
                  </Link>
                  <div className='body'> </div>
                </div>
              )}
            </div>

            {ProductsCart && CartData?.cart_contents_count > 0 && (
              <div className='buttom'>
                <div className='flex-total'>
                  <p>Total</p>
                  <p>{CartData?.subtotal} Dhs</p>
                </div>
                <Link
                  href={'/checkout'}
                  onClick={() => {
                    setShowCart(false);
                  }}
                >
                  Procéder au paiement
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {ShowGift && <Gift ShowGift={ShowGift} setShowGift={setShowGift} />}
    </>
  );
}

export default Cart;
