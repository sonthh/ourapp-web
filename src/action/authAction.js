
import { actionTypes } from '../constant/actionTypes';
import * as authService from '../service/authService';

export const passwordLogin = (loginData) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.PASSWORD_LOGIN,
    });

    try {
      const { token } = await authService.passwordLogin(loginData);

      dispatch({
        type: actionTypes.PASSWORD_LOGIN_SUCCESS,
        payloads: { token },
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
