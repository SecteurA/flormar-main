import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../app/ContextLayout';

const useCart = () => {
  const { cart, setCart, ShowCart, setShowCart } = useContext(Context);
  const [ProductsCart, setProductsCart] = useState([]);
  const [LoadingCart, setLoadingCart] = useState(false);
  const cart_length = Object?.keys(cart)?.length;

  const addToCart = (id, count, ref) => {
    if (!id) return;
    setCart({ ...cart, [ref]: { count, id } });
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
  if (ProductsCart)
    ProductsCart?.map((p) => {
      total += p?.price * p?.count || 0;
    });

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
  };
};

export { useCart };
