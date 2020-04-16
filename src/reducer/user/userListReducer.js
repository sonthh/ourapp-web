
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  dataList: {},
}

export const userListReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.USERS_FAILURE: {
      const { error } = action.payloads;

      return {
        ...state,
        error,
        isLoading: false,
        isDeleted: false,
      };
    }
    case actionTypes.FIND_MANY_USERS_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_USERS_SUCCESS: {
      const { dataList } = action.payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      }
    }
    case actionTypes.DELETE_MANY_USERS_REQUEST: {

      return {
        ...state,
        isLoadingDelete: true
      };
    }
    case actionTypes.DELETE_MANY_USERS_SUCCESS: {
      const { isDeleted, ids } = action.payloads;
      let { dataList } = state;
      let { content } = dataList;

      content = content.filter(item => {
        return !ids.includes(item.id);
      });

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
        isDeleted,
        ids,
        isLoadingDelete: false,
      }
    }
    case actionTypes.CREATE_ONE_USER_SUCCESS: {
      const { user } = action.payloads;
      const { dataList } = state;
      let { content } = dataList;
      content = [user, ...content]


      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
      }
    }
    default:
      return state;
  }
}