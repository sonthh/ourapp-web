import { combineReducers } from 'redux';
import { contractListReducer } from './contractListReducer';
import { contractItemReducer } from './contractItemReducer';

export const contractReducer = combineReducers({
  contractList: contractListReducer,
  contractItem: contractItemReducer,
});
