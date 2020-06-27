
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  item: {},
};

export const requestItemReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.CREATE_ONE_REQUEST_SUCCESS: {
      const { request } = payloads;

      return {
        ...state,
        isCreating: false,
        success: 'Tạo thành công',
        item: request,
      }
    }
    case actionTypes.CREATE_ONE_REQUEST_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isCreating: false,
        success: undefined,
      }
    }
    case actionTypes.CREATE_ONE_REQUEST_REQUEST: {
      return {
        ...state,
        isCreating: true,
        success: undefined,
      }
    }
    default:
      return state;
  }
};