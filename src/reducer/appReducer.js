
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  collapsed: false,
  isLoading: false,
  error: undefined,
}

export const appReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
      const collapsed = !state.collapsed;

      return {
        ...state,
        collapsed,
      };
    default:
      return state;
  }
}
