import { combineReducers } from 'redux';
import { personnelListReducer } from './personnelListReducer';
import { personnelItemReducer } from './personnelItemReducer';

export const personnelReducer = combineReducers({
  personnelList: personnelListReducer,
  personnelItem: personnelItemReducer,
});
