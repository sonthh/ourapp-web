import { combineReducers } from 'redux';
import { userListReducer } from './userListReducer';
import { userItemReducer } from './userItemReducer';

export const userReducer = combineReducers({
  userList: userListReducer,
  userItem: userItemReducer,
});
