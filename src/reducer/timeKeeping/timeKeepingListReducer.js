
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
};

export const timeKeepingListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_TIME_KEEPING_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_TIME_KEEPING_SUCCESS: {
      const { timeKeepingView } = payloads;

      return {
        ...state,
        timeKeepingView,
        isLoading: false,
      };
    }
    case actionTypes.FIND_TIME_KEEPING_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.CREATE_ONE_TIME_KEEPING_SUCCESS: {
      const { indexRecord, indexDate, timeKeeping } = payloads;
      let { timeKeepingView } = state;

      if (!timeKeepingView || !timeKeepingView[indexRecord]
        || !timeKeepingView[indexRecord].timeKeepingList) {
        return { ...state };
      }

      timeKeepingView[indexRecord].timeKeepingList[indexDate] = timeKeeping;
      timeKeepingView = [...timeKeepingView];

      return {
        ...state,
        timeKeepingView,
      };
    }
    case actionTypes.UPDATE_ONE_TIME_KEEPING_SUCCESS: {
      const { indexRecord, indexDate, timeKeeping } = payloads;
      let { timeKeepingView } = state;

      if (!timeKeepingView || !timeKeepingView[indexRecord]
        || !timeKeepingView[indexRecord].timeKeepingList) {
        return { ...state };
      }

      timeKeepingView[indexRecord].timeKeepingList[indexDate] = timeKeeping;
      timeKeepingView = [...timeKeepingView];

      return {
        ...state,
        timeKeepingView,
      };
    }
    case actionTypes.DELETE_ONE_TIME_KEEPING_SUCCESS: {
      const { indexRecord, indexDate, timeKeeping } = payloads;
      let { timeKeepingView } = state;

      if (!timeKeepingView || !timeKeepingView[indexRecord]
        || !timeKeepingView[indexRecord].timeKeepingList) {
        return { ...state };
      }

      timeKeepingView[indexRecord].timeKeepingList[indexDate] = timeKeeping;
      timeKeepingView = [...timeKeepingView];

      return {
        ...state,
        timeKeepingView,
        isDeleting: false,
      };
    }
    case actionTypes.DELETE_ONE_TIME_KEEPING_REQUEST: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    case actionTypes.DELETE_ONE_TIME_KEEPING_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isDeleting: false,
        error,
      };
    }
    case actionTypes.TIME_KEEPING_EXPORT_EXCEL_REQUEST: {
      return {
        ...state,
        isExporting: true,
      };
    }
    case actionTypes.TIME_KEEPING_EXPORT_EXCEL_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isExporting: false,
        error,
      };
    }
    case actionTypes.TIME_KEEPING_EXPORT_EXCEL_SUCCESS: {
      const { fileData } = payloads;

      return {
        ...state,
        isExporting: false,
        fileData,
      };
    }
    default:
      return state;
  }
};