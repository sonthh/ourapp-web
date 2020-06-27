
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
  countRequest: {},
};

export const requestListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_REQUEST_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_REQUEST_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_REQUEST_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.COUNT_REQUEST_REQUEST: {

      return {
        ...state,
      };
    }
    case actionTypes.COUNT_REQUEST_SUCCESS: {
      const { countRequest } = payloads;

      return {
        ...state,
        countRequest,
      };
    }
    case actionTypes.COUNT_REQUEST_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
      };
    }
    default:
      return state;
  }
};
