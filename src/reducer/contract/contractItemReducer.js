
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  item: {},
};

export const contractItemReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.CREATE_ONE_CONTRACT_SUCCESS: {
      const { contract } = payloads;

      return {
        ...state,
        isCreating: false,
        success: 'Tạo thành công',
        item: contract,
      }
    }
    case actionTypes.CREATE_ONE_CONTRACT_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isCreating: false,
        success: undefined,
      }
    }
    case actionTypes.CREATE_ONE_CONTRACT_REQUEST: {
      return {
        ...state,
        isCreating: true,
        success: undefined,
      }
    }
    case actionTypes.FIND_ONE_CONTRACT_SUCCESS: {
      const { contract } = payloads;

      return {
        ...state,
        isLoading: false,
        item: contract,
      }
    }
    case actionTypes.FIND_ONE_CONTRACT_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isLoading: false,
      }
    }
    case actionTypes.FIND_ONE_CONTRACT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.UPDATE_ONE_CONTRACT_SUCCESS: {
      const { contract } = payloads;

      return {
        ...state,
        isUpdating: false,
        success: 'Sửa thành công',
        item: contract,
      }
    }
    case actionTypes.UPDATE_ONE_CONTRACT_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_CONTRACT_REQUEST: {
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