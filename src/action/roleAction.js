
import { actionTypes } from '../constant/actionTypes';
import * as roleService from '../service/roleService';

export const findManyRoles = () => {

  return async (dispatch) => {
    try {
      const roles = await roleService.findManyRoles();

      dispatch({
        type: actionTypes.FIND_MANY_ROLES_SUCCESS,
        payloads: { roles },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const findOneRole = (id) => {

  return async (dispatch) => {
    try {
      const role = await roleService.findOneRole(id);

      dispatch({
        type: actionTypes.FIND_ONE_ROLE_SUCCESS,
        payloads: { role },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
