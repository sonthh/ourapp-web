
import { actionTypes } from '../constant/actionTypes';
import * as authService from '../service/authService';

export const passwordLogin = (loginData) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.PASSWORD_LOGIN,
    });

    try {
      const authData = await authService.passwordLogin(loginData);

      dispatch({
        type: actionTypes.PASSWORD_LOGIN_SUCCESS,
        payloads: authData,
      });
    } catch (error) {
      const errorData = error.response.data;
      
      dispatch({
        type: actionTypes.PASSWORD_LOGIN_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}

export const userMe = () => {

  return async (dispatch) => {
    try {
      const currentUser = await authService.userMe();

      dispatch({
        type: actionTypes.FIND_ME_SUCCESS,
        payloads: { currentUser },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
