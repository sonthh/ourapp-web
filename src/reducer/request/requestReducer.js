import { combineReducers } from 'redux';
import { requestListReducer } from './requestListReducer';
import { requestItemReducer } from './requestItemReducer';

export const requestReducer = combineReducers({
  requestList: requestListReducer,
  requestItem: requestItemReducer,
});
