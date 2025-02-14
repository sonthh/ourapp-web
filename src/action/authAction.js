
import { actionTypes } from '../constant/actionTypes';
import * as authService from '../service/authService';

export const passwordLogin = (loginData) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_REQUEST,
    });

    try {
      const authData = await authService.passwordLogin(loginData);

      dispatch({
        type: actionTypes.PASSWORD_LOGIN_SUCCESS,
        payloads: { authData },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const userMe = () => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_REQUEST,
    });

    try {
      const currentUser = await authService.userMe();

      dispatch({
        type: actionTypes.FIND_ME_SUCCESS,
        payloads: { currentUser },
      });
    } catch (error) {
      const errorData = error.response.data;

      dispatch({
        type: actionTypes.AUTH_FAILURE,
        payloads: { error: errorData },
      });
    }
  };
};
