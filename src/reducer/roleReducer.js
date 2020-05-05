
import { actionTypes } from '../constant/actionTypes';

const initialState = {
  isLoading: false,
  roles: [],
  role: {},
};

export const roleReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_ONE_ROLE_SUCCESS: {
      const { role } = payloads;

      return {
        ...state,
        role,
      };
    }
    case actionTypes.FIND_MANY_ROLES_SUCCESS: {
      const { roles } = payloads;

      return {
        ...state,
        roles,
      };
    }
    default:
      return state;
  }
};
