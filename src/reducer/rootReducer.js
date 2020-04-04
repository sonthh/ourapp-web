import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { productReducer } from '../reducer/product/productReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  product: productReducer,
  auth: authReducer,
});
