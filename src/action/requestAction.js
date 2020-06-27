
import { actionTypes } from '../constant/actionTypes';
import * as requestService from '../service/requestService';

export const createOneRequest = (requestPayload) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_REQUEST_REQUEST,
    });

    try {
      const request = await requestService.addRequest(requestPayload);

      dispatch({
        type: actionTypes.CREATE_ONE_REQUEST_SUCCESS,
        payloads: { request },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_REQUEST_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findManyRequests = (params = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_REQUEST_REQUEST,
    });

    try {
      const dataList = await requestService.findManyRequests(params)

      dispatch({
        type: actionTypes.FIND_MANY_REQUEST_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_REQUEST_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const countRequests = (params = {}) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.COUNT_REQUEST_REQUEST,
    });

    try {
      const countRequest = await requestService.countRequests(params);

      dispatch({
        type: actionTypes.COUNT_REQUEST_SUCCESS,
        payloads: { countRequest },
      })
    } catch (error) {
      dispatch({
        type: actionTypes.COUNT_REQUEST_FAILURE,
        payloads: { error },
      })
    }
  }
}
