import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';

export const productReducer = combineReducers({
  productList: productListReducer,
});
