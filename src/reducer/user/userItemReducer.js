
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isShowModal: false,
  item: {},
}

export const userItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL_USER_FORM: {
      return {
        ...state,
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
    default:
      return state;
  }
}