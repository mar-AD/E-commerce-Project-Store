
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    case 'ADD_TO_LIKED_PRODUCTS':
      const productToAddToLiked = action.payload;
      const updatedLikedProductsArray = [...state.likedProducts, productToAddToLiked];
      localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProductsArray));
      return { ...state, likedProducts: updatedLikedProductsArray };
    
    case 'REMOVE_FROM_LIKED_PRODUCTS':
      const productIdToRemoveFromLiked = action.payload;
      const updatedLikedProducts = state.likedProducts.filter(
        (likedProduct) => likedProduct._id !== productIdToRemoveFromLiked
      );
      localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
      return { ...state, likedProducts: updatedLikedProducts };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: storedCart,
    likedProducts: storedLikedProducts,
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState.cart));
    localStorage.setItem('likedProducts', JSON.stringify(cartState.likedProducts));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ ...cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };