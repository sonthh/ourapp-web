
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  item: {},
};

export const timeKeepingItemReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.CREATE_ONE_TIME_KEEPING_SUCCESS: {
      const { timeKeeping } = payloads;

      return {
        ...state,
        isCreating: false,
        success: 'Tạo thành công',
        item: timeKeeping,
      }
    }
    case actionTypes.CREATE_ONE_TIME_KEEPING_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isCreating: false,
        success: undefined,
      }
    }
    case actionTypes.CREATE_ONE_TIME_KEEPING_REQUEST: {
      return {
        ...state,
        isCreating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_TIME_KEEPING_SUCCESS: {
      const { timeKeeping } = payloads;

      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        item: timeKeeping,
      }
    }
    case actionTypes.UPDATE_ONE_TIME_KEEPING_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_TIME_KEEPING_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    default:
      return state;
  }
};