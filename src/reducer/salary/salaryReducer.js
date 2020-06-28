import { combineReducers } from 'redux';
import { salaryListReducer } from './salaryListReducer';

export const salaryReducer = combineReducers({
  salaryList: salaryListReducer,
});
