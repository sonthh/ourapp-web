import { combineReducers } from 'redux';
import { personnelListReducer } from './personnelListReducer';

export const personnelReducer = combineReducers({
  personnelList: personnelListReducer,
});
