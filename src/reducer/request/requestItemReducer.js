
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
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
    case actionTypes.UPDATE_ONE_REQUEST_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_REQUEST_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_ONE_REQUEST_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated: true,
      }
    }
    default:
      return state;
  }
};