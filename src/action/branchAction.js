
import { actionTypes } from '../constant/actionTypes';
import * as branchService from '../service/branchService';

export const findManyBranches = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_BRANCHES_REQUEST,
    });

    try {
      const dataList = await branchService.findManyBranches(params);

      dispatch({
        type: actionTypes.FIND_MANY_BRANCHES_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_BRANCHES_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const createOneBranch = (branchRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_BRANCH_REQUEST,
    });

    try {
      const branch = await branchService.createOneBranch(branchRequest);

      dispatch({
        type: actionTypes.CREATE_ONE_BRANCH_SUCCESS,
        payloads: { branch },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_BRANCH_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findOneBranch = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_ONE_BRANCH_REQUEST,
    });

    try {
      const branch = await branchService.findOneBranch(id);

      dispatch({
        type: actionTypes.FIND_ONE_BRANCH_SUCCESS,
        payloads: { branch },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_ONE_BRANCH_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateOneBranch = (branchRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ONE_BRANCH_REQUEST,
    });

    try {
      const branch = await branchService.updateOneBranch(branchRequest);

      dispatch({
        type: actionTypes.UPDATE_ONE_BRANCH_SUCCESS,
        payloads: { branch },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ONE_BRANCH_FAILURE,
        payloads: { error },
      });
    }
  };
};
