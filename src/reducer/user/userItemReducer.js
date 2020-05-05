
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  item: {},
};

export const userItemReducer = (state = initialState, { type, payloads }) => {
  switch (type) {
    case actionTypes.FIND_ONE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.FIND_ONE_USER_SUCCESS: {
      const { user } = payloads;
      return {
        ...state,
        isLoading: false,
        item: user,
      }
    }
    case actionTypes.CREATE_ONE_USER_SUCCESS: {
      const { user } = payloads;

      return {
        ...state,
        isCreatingUser: false,
        success: 'Created successfully',
        item: user,
      }
    }
    case actionTypes.CREATE_ONE_USER_FAILURE: {
      return {
        ...state,
        error: payloads.error,
        isCreatingUser: false,
      }
    }
    case actionTypes.CREATE_ONE_USER_REQUEST: {
      return {
        ...state,
        isCreatingUser: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_USER_REQUEST: {
      return {
        ...state,
        isUpdatingUser: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_ONE_USER_FAILURE: {
      return {
        ...state,
        error: payloads.error,
        isUpdatingUser: false,
      }
    }
    case actionTypes.UPDATE_ONE_USER_SUCCESS: {
      const { user } = payloads;
      return {
        ...state,
        isUpdatingUser: false,
        success: 'Updated successfully',
        item: user,
      }
    }
    case actionTypes.UPDATE_MY_AVATAR_REQUEST: {
      return {
        ...state,
        isUploadingAvatar: true,
      }
    }
    case actionTypes.UPDATE_MY_AVATAR_SUCCESS: {
      const { avatarUrl } = payloads;
      return {
        ...state,
        isUploadingAvatar: false,
        avatarUrl,
      }
    }
    case actionTypes.UPDATE_MY_AVATAR_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isUploadingAvatar: false,
        error,
      }
    }
    case actionTypes.FIND_USER_ME_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.FIND_USER_ME_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    case actionTypes.FIND_USER_ME_SUCCESS: {
      const { userMe } = payloads;
      return {
        ...state,
        isLoading: false,
        userMe,
      }
    }
    default:
      return state;
  }
};