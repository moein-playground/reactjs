import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';
// import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  //list we dont want to presist
  // blackList: ['user'],
  whiteList: ['card'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhanser =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhanser(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

//this should put after store instantiated, otherwise does not working.
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
