import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangeListener,
  // signOutUser,
} from '../src/utils/firebase-utils/firebase.utils';

import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.compoentn';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';
import { fetchCategoriesStart } from './store/categories/categories.actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log('this is our user', user);
    });

    const getCategoriesMap = async () => {
      dispatch(fetchCategoriesStart());
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
