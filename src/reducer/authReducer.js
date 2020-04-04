
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.PASSWORD_LOGIN_SUCCESS:
      const { token } = action.payloads;

      return {
        token,
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
    default:
      return state;
  }
}
