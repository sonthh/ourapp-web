
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  item: {},
};

export const branchItemReducer = (state = initialState, { type, payloads }) => {
  switch (type) {
    case actionTypes.CREATE_ONE_BRANCH_SUCCESS: {
      const { branch } = payloads;

      return {
        ...state,
        isCreatingBranch: false,
        success: 'Tạo thành công',
        item: branch,
      }
    }
    case actionTypes.CREATE_ONE_BRANCH_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isCreatingBranch: false,
      }
    }
    case actionTypes.CREATE_ONE_BRANCH_REQUEST: {
      return {
        ...state,
        isCreatingBranch: true,
        success: undefined,
      }
    }
    case actionTypes.FIND_ONE_BRANCH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.FIND_ONE_BRANCH_SUCCESS: {
      const { branch } = payloads;
      return {
        ...state,
        isLoading: false,
        item: branch,
      }
    }
    case actionTypes.FIND_ONE_BRANCH_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    case actionTypes.UPDATE_ONE_BRANCH_REQUEST: {
      return {
        ...state,
        isUpdatingBranch: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_BRANCH_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdatingBranch: false,
      }
    }
    case actionTypes.UPDATE_ONE_BRANCH_SUCCESS: {
      const { branch } = payloads;
      return {
        ...state,
        isUpdatingBranch: false,
        success: 'Cập nhật thành công',
        item: branch,
      }
    }
    default:
      return state;
  }
};