
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  salaryView: [],
};

export const salaryListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_SALARY_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_SALARY_SUCCESS: {
      const { salaryView } = payloads;

      return {
        ...state,
        salaryView,
        isLoading: false,
      };
    }
    case actionTypes.FIND_SALARY_FAILURE: {
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