import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { userReducer } from '../reducer/user/userReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  auth: authReducer,
});
