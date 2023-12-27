import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('current State', store.getState());

  next(action);

  console.log('next state', store.getState());
};

const persistConfig = {
  key: 'root',
  storage,
  //list we donr want to presist
  blackList: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger];
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
