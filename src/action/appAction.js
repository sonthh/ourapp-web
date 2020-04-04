
import { actionTypes } from '../constant/actionTypes';

export const toggleMenu = () => {
  
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_MENU,
    });
  }
}
