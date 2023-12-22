import { createContext, useState, useEffect } from 'react';
import { getCatgoriesAndDocuments } from '../utils/firebase-utils/firebase.utils';

// import { addCollectionAndDocuments } from '../utils/firebase-utils/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: [],
  setCategoriesMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
  //For adding data to DB , this should run once, because we just working from FrontEnd
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])

  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCatgoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
