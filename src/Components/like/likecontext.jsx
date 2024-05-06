// const likeIcon = (product) => {
//   // Check if the product is already liked
//   if (!likedProducts.includes(product)) {
//     // Add the product to the likedProducts array
//     setLikedProducts([...likedProducts, product]);
//   }
// };
// likecontext.jsx

import React, { createContext, useContext, useReducer } from 'react';

const LikeContext = createContext();

const likeReducer = (state, action) => {
  // Your reducer logic here
  switch (action.type) {
    case 'ADD_TO_LIKES':
      // Handle adding to liked items
      return { ...state, likedItems: [...state.likedItems, action.payload] };
    // Other cases...
    default:
      return state;
  }
};

const LikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likeReducer, { likedItems: [] });

  return (
    <LikeContext.Provider value={{ state, dispatch }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};

export { LikeProvider, useLike };
