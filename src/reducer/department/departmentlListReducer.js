
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  dataList: {},
};

export const departmentListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_DEPARTMENTS_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_DEPARTMENTS_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_DEPARTMENTS_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      }
    }
    default:
      return state;
  }
};