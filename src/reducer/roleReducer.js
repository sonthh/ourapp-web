
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  isLoading: false,
  roles: [],
  role: {},
}

export const roleReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.FIND_ONE_ROLE_SUCCESS: {
      const role = action.payloads.role;

      return {
        ...state,
        role,
      };
    }
    case actionTypes.FIND_MANY_ROLES_SUCCESS: {
      const roles = action.payloads.roles;

      return {
        ...state,
        roles,
      };
    }
    default:
      return state;
  }
}
