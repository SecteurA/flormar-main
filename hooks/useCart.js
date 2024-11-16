import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../app/ContextLayout';

const useCart = () => {
  let local_cart = {};
  try {
    local_cart = JSON.parse(localStorage.getItem('cart') || '{}');
  } catch (error) {}

  const [cart, setCart] = useState(local_cart);
  const [ProductsCart, setProductsCart] = useState([]);
  const [LoadingCart, setLoadingCart] = useState(false);

  const [ShowCart, setShowCart] = useState(false);
  const cart_length = Object?.keys(cart)?.length;

  const addToCart = (id, count, ref, var_id) => {
    if (!id) return;
    setCart({ ...cart, [ref]: { count, id, var_id } });
  };

  const removeFromCart = (ref) => {
    if (!ref) return;
    let new_cart = { ...cart };
    delete new_cart[ref];
    setCart(new_cart);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let items = Object?.keys(cart)
      ?.filter((item) => cart[item]?.id && item !== 'undefined')
      ?.map((item) => cart[item]?.id);
    if (items?.length > 0) {
      setLoadingCart(true);
      axios
        .get(`/api/product?include=${items?.join(',')}`)
        .then(({ data }) => {
          if (data?.length > 0) {
            setProductsCart(
              Object.keys(cart)
                ?.map((item) => {
                  let prod = data?.find(
                    (p) => p?.id?.toString() === cart[item]?.id?.toString()
                  );
                  return prod
                    ? { ...prod, count: cart[item]?.count || 1, sku_cart: item }
                    : null;
                })
                ?.filter((p) => p && p?.sku_cart !== 'undefined')
            );
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingCart(false));
    } else setProductsCart([]);
  }, [cart]);

  let total = 0;
  let items_length = 0;
  if (ProductsCart)
    ProductsCart?.map((p) => {
      total += p?.price * p?.count || 0;
      items_length += p?.count || 0;
    });

  const [Gifts, setGifts] = useState([]);
  const [CartData, setCartData] = useState({
    subtotal: '0',
    discount_total: 0,
    shipping_total: '0',
    total: '0',
    products: [],
    cart_contents_count: 0,
  });
  async function calculateTotals({
    cart_items,
    coupon_code,
    shipping_method,
    customer_data,
  }) {
    try {
      setLoadingCart(true);
      const local_gift = localStorage.getItem('gift');
      const gifts = {
        gift_products: local_gift
          ? [JSON.parse(local_gift)]
          : Gifts?.map((p) => ({
              rule_id: p?.rule_id,
              quantity: 1,
              product_id: p?.products?.[0] || p?.product_id,
            })),
      };
      axios
        .post('https://admin.flormar.ma/wp-json/custom/v1/calculate_totals', {
          cart_items,
          coupon_code,
          shipping_method,
          customer_data,
          ...gifts,
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
          setLoadingCart(false);
          data?.products?.map((prod) => {
            if (prod?.product_data?.ywdpd_is_gift_product)
              localStorage.setItem(
                'gift',
                JSON.stringify({
                  product_id: prod?.product_id,
                  rule_id: prod?.product_data?.ywdpd_rule_id,
                  quantity: 1,
                  sku: '',
                  variations: [],
                })
              );
          });
          let ywdpd_is_gift_product = data?.products?.find(
            (p) => p?.product_data?.ywdpd_is_gift_product && p?.price === 0
          );
          if (!ywdpd_is_gift_product) {
            try {
              localStorage.removeItem('gift');
            } catch (error) {}
          }
          if (data?.cart_contents_count) setCartData(data);
          else {
            setCartData({
              subtotal: '0',
              discount_total: 0,
              shipping_total: '0',
              total: '0',
              products: [],
              cart_contents_count: 0,
            });
          }
        })
        .catch((err) => {
          console.log(error);
          setLoadingCart(false);
          setCartData({
            subtotal: 0,
            discount_total: 0,
            shipping_total: 0,
            total: 0,
            products: [],
            cart_contents_count: 0,
          });
        });
    } catch (error) {}
  }

  const getGifts = async () => {
    axios
      .get('https://admin.flormar.ma/wp-json/wc-discounts/v1/rules')
      .then(({ data }) => {
        console.log(data);
        setGifts(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    calculateTotals({
      cart_items: Object.keys(cart)?.map((sku) => ({
        quantity: cart?.[sku]?.count,
        product_id: cart?.[sku]?.id,
        var_id: cart?.[sku]?.var_id,
      })),
      coupon_code: 30,
      shipping_method: 'flat_rate',
      customer_data: {
        shipping_postcode: 'CASABLANCA',
      },
    });
  }, [cart, Gifts, ShowCart]);

  useEffect(() => {
    getGifts();
  }, []);

  return {
    cart,
    setCart,
    setShowCart,
    ShowCart,
    ProductsCart,
    addToCart,
    removeFromCart,
    total,
    LoadingCart,
    items_length,
    setLoadingCart,
    Gifts,
    CartData,
    getGifts,
  };
};

export { useCart };
