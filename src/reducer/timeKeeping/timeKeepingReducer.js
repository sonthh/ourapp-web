import { combineReducers } from 'redux';
import { timeKeepingListReducer } from './timeKeepingListReducer';
import { timeKeepingItemReducer } from './timeKeepingItemReducer';

export const timeKeepingReducer = combineReducers({
  timeKeepingList: timeKeepingListReducer,
  timeKeepingItem: timeKeepingItemReducer,
});
