
import { actionTypes } from '../constant/actionTypes';
import * as timeKeepingService from '../service/timeKeepingService';

export const createTimeKeeping = (indexRecord, indexDate, personnelId, request) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_TIME_KEEPING_REQUEST,
    });

    try {
      const timeKeeping = await timeKeepingService.createTimeKeeping(personnelId, request);

      dispatch({
        type: actionTypes.CREATE_ONE_TIME_KEEPING_SUCCESS,
        payloads: { timeKeeping, indexRecord, indexDate },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_TIME_KEEPING_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateTimeKeeping = (indexRecord, indexDate, personnelId, timeKeepingId, request) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ONE_TIME_KEEPING_REQUEST,
    });

    try {
      const timeKeeping = await timeKeepingService.updateTimeKeeping(personnelId, timeKeepingId, request);

      dispatch({
        type: actionTypes.UPDATE_ONE_TIME_KEEPING_SUCCESS,
        payloads: { timeKeeping, indexRecord, indexDate },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ONE_TIME_KEEPING_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const deleteTimeKeeping = (indexRecord, indexDate, personnelId, timeKeepingId) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ONE_TIME_KEEPING_REQUEST,
    });

    try {
      const isDeleted = await timeKeepingService.deleteTimeKeeping(personnelId, timeKeepingId);

      dispatch({
        type: actionTypes.DELETE_ONE_TIME_KEEPING_SUCCESS,
        payloads: { timeKeeping: null, isDeleted, indexRecord, indexDate },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ONE_TIME_KEEPING_FAILURE,
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


export const exportExcel = (params) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.TIME_KEEPING_EXPORT_EXCEL_REQUEST,
    });

    try {
      const fileData = await timeKeepingService.exportExcel(params);

      dispatch({
        type: actionTypes.TIME_KEEPING_EXPORT_EXCEL_SUCCESS,
        payloads: { fileData },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.TIME_KEEPING_EXPORT_EXCEL_FAILURE,
        payloads: { error },
      });
    }
  };
};
