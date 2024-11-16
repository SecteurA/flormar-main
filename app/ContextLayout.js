'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
export const Context = createContext({
  menu: [],
  wishes: {},
  setWishes: () => {},
});
function ContextLayout({ children, menu }) {
  let local_wishes = {};
  try {
    local_wishes = JSON.parse(localStorage.getItem('wishes') || '{}');
  } catch (error) {}

  const [Start, setStart] = useState(false);
  const [wishes, setWishes] = useState(local_wishes);

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
    calculateTotals,
    CartData,
    setProductsCart,
    getGifts,
    Gifts,
  } = useCart();

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
    setStart(true);
  }, [wishes]);

  return (
    <Context.Provider
      value={{
        menu,
        wishes,
        setWishes,
        ShowCart,
        setShowCart,
        cart,
        addToCart,
        removeFromCart,
        ProductsCart,
        LoadingCart,
        total,
        items_length,
        setLoadingCart,
        calculateTotals,
        CartData,
        setProductsCart,
        getGifts,
        Gifts,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextLayout;
