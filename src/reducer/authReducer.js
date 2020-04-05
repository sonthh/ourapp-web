
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.PASSWORD_LOGIN_SUCCESS:
    
    return {
        ...action.payloads,
        isLoading: false,
        isAuthenticated: true,
      }
    case actionTypes.PASSWORD_LOGIN:

      return {
        isLoading: true,
      };
    case actionTypes.PASSWORD_LOGIN_FAILURE:
      const { error } = action.payloads;

      return {
        error,
        isLoading: false,
      };
    case actionTypes.FIND_ME_SUCCESS:
      const { currentUser } = action.payloads;
      
      return {
        currentUser,
        isLoading: false,
      };
    default:
      return state;
  }
}
