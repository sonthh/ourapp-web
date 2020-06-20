
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
    default:
      return state;
  }
};