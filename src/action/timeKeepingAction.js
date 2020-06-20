
import { actionTypes } from '../constant/actionTypes';
import * as timeKeepingService from '../service/timeKeepingService';

export const createTimeKeeping = (request) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_TIME_KEEPING_REQUEST,
    });

    try {
      const timeKeeping = await timeKeepingService.findTimeKeeping(request);

      dispatch({
        type: actionTypes.CREATE_ONE_TIME_KEEPING_SUCCESS,
        payloads: { timeKeeping },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_TIME_KEEPING_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findTimeKeeping = (params) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_TIME_KEEPING_REQUEST,
    });

    try {
      const timeKeepingView = await timeKeepingService.findTimeKeeping(params);
      console.log(timeKeepingView);

      dispatch({
        type: actionTypes.FIND_TIME_KEEPING_SUCCESS,
        payloads: { timeKeepingView },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_TIME_KEEPING_FAILURE,
        payloads: { error },
      });
    }
  };
};
