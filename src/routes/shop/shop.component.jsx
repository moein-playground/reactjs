import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCatgoriesAndDocuments } from '../../utils/firebase-utils/firebase.utils';
import { setCategories } from '../../store/categories/categories.actions';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCatgoriesAndDocuments();
      dispatch(setCategories(categories));
    };
    getCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
