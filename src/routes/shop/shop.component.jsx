import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCatgoriesAndDocuments } from '../../utils/firebase-utils/firebase.utils';
import { setCategoriesMap } from '../../store/categories/categories.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCatgoriesAndDocuments();
      dispatch(setCategoriesMap(categoriesMap));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
