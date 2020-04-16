
import { actionTypes } from '../constant/actionTypes';
import * as userService from '../service/userService';

export const findManyUsers = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_USERS_REQUEST,
    });

    try {
      const dataList = await userService.findManyUsers(params);

      dispatch({
        type: actionTypes.FIND_MANY_USERS_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      console.log(error);

      const errorData = error.response;

      dispatch({
        type: actionTypes.USERS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}

export const delteManyUsers = (ids) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_MANY_USERS_REQUEST,
    });

    try {
      const isDeleted = await userService.deleteManyUsers(ids);

      dispatch({
        type: actionTypes.DELETE_MANY_USERS_SUCCESS,
        payloads: { isDeleted, ids },
      });
    } catch (error) {
      const errorData = error.response;

      dispatch({
        type: actionTypes.USERS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}

export const toggleModalUserForm = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_MODAL_USER_FORM,
    });
  }
}

export const findOneUser = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_ONE_USER_REQUEST,
    });

    try {
      const user = await userService.findOneUser(id);

      dispatch({
        type: actionTypes.FIND_ONE_USER_SUCCESS,
        payloads: { user },
      });
    } catch (error) {
      console.log(error);

      const errorData = error.response;

      dispatch({
        type: actionTypes.USERS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}

export const createOneUser = (userRequest) => {

  return async (dispatch) => {
    // dispatch({
    //   type: actionTypes.FIND_ONE_USER_REQUEST,
    // });

    try {
      const user = await userService.createOneUser(userRequest);

      dispatch({
        type: actionTypes.CREATE_ONE_USER_SUCCESS,
        payloads: { user },
      });
    } catch (error) {
      console.log(error);

      // const errorData = error.response;

      // dispatch({
      //   type: actionTypes.USERS_FAILURE,
      //   payloads: { error: errorData },
      // });
    }
  }
}