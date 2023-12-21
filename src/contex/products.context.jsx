import { createContext, useState, useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utils/firebase-utils/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  //For adding data to DB , this should run once, because we just working from FrontEnd
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
