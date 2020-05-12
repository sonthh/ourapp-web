import { combineReducers } from 'redux';
import { branchItemReducer } from './branchItemReducer';
import { branchListReducer } from './branchlListReducer';

export const branchReducer = combineReducers({
  branchList: branchListReducer,
  branchItem: branchItemReducer,
});
