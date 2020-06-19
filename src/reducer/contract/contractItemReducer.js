
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
    default:
      return state;
  }
};