
import { actionTypes } from '../constant/actionTypes';
import { setting } from '../setting';

const initialState = {
  collapsed: false,
  isLoading: false,
  error: undefined,
  navigationMode: setting.navigationMode,
};

export const appReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.TOGGLE_MENU: {
      const collapsed = !state.collapsed;

      return {
        ...state,
        collapsed,
      };
    }
    case actionTypes.CHANGE_NAVIGATION_MODE: {
      const { navigationMode } = payloads;

      return {
        ...state,
        navigationMode,
      };
    }
    default:
      return state;
  }
};
