
import { actionTypes } from '../constant/actionTypes';

export const toggleMenu = () => {

  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_MENU,
    });
  }
};

export const changeNavigationMode = (navigationMode) => {

  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_NAVIGATION_MODE,
      payloads: { navigationMode },
    });
  }
};
