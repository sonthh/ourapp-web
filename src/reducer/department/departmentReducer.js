import { combineReducers } from 'redux';
import { departmentItemReducer } from './departmentItemReducer';
import { departmentListReducer } from './departmentlListReducer';

export const departmentReducer = combineReducers({
  departmentItem: departmentItemReducer,
  departmentList: departmentListReducer,
});
