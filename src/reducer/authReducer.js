
import { actionTypes } from '../constant/actionTypes';
import { getCurrentUser } from '../util/auth';

const auth = getCurrentUser();

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  authData: auth,
};

export const authReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.AUTH_REQUEST: {

      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.AUTH_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.PASSWORD_LOGIN_SUCCESS: {
      const { authData } = payloads;
      return {
        ...state,
        authData,
        isLoading: false,
        isAuthenticated: true,
      }
    }
    case actionTypes.UPDATE_MY_AVATAR_SUCCESS: {
      const { avatarUrl } = payloads;
      const { authData } = state;
      
      return {
        ...state,
        authData: { ...authData, avatar: avatarUrl },
      }
    }
    default:
      return state;
  }
};
