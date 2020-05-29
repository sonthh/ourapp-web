
import { actionTypes } from '../constant/actionTypes';
import * as departmentService from '../service/departmentService';

export const findManyDepartments = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_DEPARTMENTS_REQUEST,
    });

    try {
      const dataList = await departmentService.findManyDepartments(params);

      dispatch({
        type: actionTypes.FIND_MANY_DEPARTMENTS_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_DEPARTMENTS_FAILURE,
        payloads: { error },
      });
    }
  };
};
