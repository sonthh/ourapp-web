
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
      dispatch({
        type: actionTypes.FIND_MANY_USERS_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const delteOneUser = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ONE_USER_REQUEST,
      payloads: { id },
    });

    try {
      const isDeleted = await userService.deleteOneUser(id);

      dispatch({
        type: actionTypes.DELETE_ONE_USER_SUCCESS,
        payloads: { isDeleted, id },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ONE_USER_FAILURE,
        payloads: { error },
      });
    }
  };
};

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
  };
};

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
      const errorData = error.response;

      dispatch({
        type: actionTypes.USERS_FAILURE,
        payloads: { error: errorData },
      });
    }
  };
};

export const createOneUser = (userRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_USER_REQUEST,
    });

    try {
      const user = await userService.createOneUser(userRequest);

      dispatch({
        type: actionTypes.CREATE_ONE_USER_SUCCESS,
        payloads: { user },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_USER_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateOneUser = (userRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ONE_USER_REQUEST,
    });

    try {
      const user = await userService.updateOneUser(userRequest);

      dispatch({
        type: actionTypes.UPDATE_ONE_USER_SUCCESS,
        payloads: { user },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ONE_USER_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateMyAvatar = (formData) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_MY_AVATAR_REQUEST,
    });

    try {
      const avatarUrl = await userService.updateMyAvatar(formData);
      
      dispatch({
        type: actionTypes.UPDATE_MY_AVATAR_SUCCESS,
        payloads: { avatarUrl },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_MY_AVATAR_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findUserMe = () => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_USER_ME_REQUEST,
    });

    try {
      const userMe = await userService.findUserMe();
      
      dispatch({
        type: actionTypes.FIND_USER_ME_SUCCESS,
        payloads: { userMe },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_USER_ME_FAILURE,
        payloads: { error },
      });
    }
  };
};