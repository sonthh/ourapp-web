
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
    case actionTypes.FIND_MANY_PERMISSION_SUCCESS: {
      const { permissions } = payloads;

      return {
        ...state,
        permissions,
      };
    }
    case actionTypes.UPDATE_ROLE_SCOPES_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      };
    }
    case actionTypes.UPDATE_ROLE_SCOPES_SUCCESS: {
      const { role } = payloads;

      return {
        ...state,
        role,
        isUpdating: false,
        success: 'Cập nhật thành công',
      };
    }
    case actionTypes.UPDATE_ROLE_SCOPES_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: undefined,
        error,
      };
    }
    default:
      return state;
  }
};
