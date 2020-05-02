
import { actionTypes } from '../constant/actionTypes';
import * as personnelService from '../service/personnelService';

export const findManyPersonnel = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_PERSONNEL_REQUEST,
    });

    try {
      const dataList = await personnelService.findManyPersonnel(params);
      console.log(dataList);
      

      dispatch({
        type: actionTypes.FIND_MANY_PERSONNEL_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_PERSONNEL_FAILURE,
        payloads: { error },
      });
    }
  }
}
