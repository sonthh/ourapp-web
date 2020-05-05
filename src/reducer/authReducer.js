
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.AUTH_REQUEST:

      return {
        isLoading: true,
      };
    case actionTypes.AUTH_FAILURE:
      const { error } = payloads;

      return {
        error,
        isLoading: false,
      };
    case actionTypes.PASSWORD_LOGIN_SUCCESS:

      return {
        ...payloads,
        isLoading: false,
        isAuthenticated: true,
      }
    case actionTypes.FIND_ME_SUCCESS:
      const { currentUser } = payloads;

      return {
        currentUser,
        isLoading: false,
      };
    default:
      return state;
  }
};
