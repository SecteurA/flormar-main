import React, { useContext, useEffect, useState } from 'react';
import './Gift.css';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import ProductFilter from '../../app/search/ProductFilter';
import '../../app/search//Search.css';
import { Context } from '../../app/ContextLayout';

const Gift = ({ setShowGift, ShowGift }) => {
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

  const [GiftProducts, setGiftProducts] = useState([]);

  const gift_id = CartData?.products?.find(
    (p) => p?.product_data?.ywdpd_is_gift_product
  )?.product_data?.ywdpd_rule_id;

  useEffect(() => {
    console.log({ Gifts, gift_id });
    let prods = Gifts?.find((g) => g?.rule_id === gift_id)?.products?.map(
      (pr, i) => pr
    );
    axios.get(`/api/product?include=${prods?.join(',')}`).then(({ data }) => {
      console.log({ Products_Gifts: data });
      setGiftProducts(data);
    });
  }, [Gifts, gift_id]);

  return (
    <>
      <div className='Gift'>
        <img src='/images/gift.png' alt='' className='gift-img' />
        <div className='Products-container'>
          <div className='Products' style={{ paddingTop: '30px' }}>
            {GiftProducts?.map((product, i) => (
              <ProductFilter
                key={i}
                {...{ product }}
                setShowGift={setShowGift}
                gift={gift_id}
              />
            ))}

            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='Product' />
              ))}
          </div>
        </div>
      </div>
      <div className='overlay' onClick={() => setShowGift(false)}></div>
    </>
  );
};

export default Gift;
