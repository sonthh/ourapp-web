import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { userReducer } from '../reducer/user/userReducer';
import { authReducer } from './authReducer';
import { roleReducer } from './roleReducer';
import { personnelReducer } from './personnel/personnelReducer';
import { branchReducer } from './branch/branchReducer';
import { departmentReducer } from './department/departmentReducer';
import { contractReducer } from './contract/contractReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  personnel: personnelReducer,
  auth: authReducer,
  role: roleReducer,
  branch: branchReducer,
  department: departmentReducer,
  contract: contractReducer,
});
