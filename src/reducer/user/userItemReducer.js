
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isShowModal: false,
  item: {},
}

export const userItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL_USER_FORM: {
      let { item } = state;

      if (action.payloads.isAddForm === true) {
        item = {};
      }

      return {
        ...state,
        item,
        isShowModal: !state.isShowModal,
      }
    }
    case actionTypes.FIND_ONE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.FIND_ONE_USER_SUCCESS: {
      const { user } = action.payloads;
      return {
        ...state,
        isLoading: false,
        item: user,
      }
    }
    case actionTypes.CREATE_ONE_USER_SUCCESS: {
      return {
        ...state,
        isLoadingCreatingUser: false,
        success: 'CreateUser',
      }
    }
    case actionTypes.CREATE_ONE_USER_FAILURE: {
      return {
        ...state,
        error: action.payloads.error,
        isLoadingCreatingUser: false,
      }
    }
    case actionTypes.CREATE_ONE_USER_REQUEST: {
      return {
        ...state,
        isLoadingCreatingUser: true,
        success: undefined,
      }
    }
    default:
      return state;
  }
}