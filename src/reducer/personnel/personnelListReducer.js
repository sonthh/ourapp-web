
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
};

export const personnelListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_PERSONNEL_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_PERSONNEL_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_PERSONNEL_FAILURE: {
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