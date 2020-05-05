
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
};

export const userListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.USERS_FAILURE: {
      const { error } = payloads;

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
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      }
    }
    case actionTypes.FIND_MANY_USERS_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      }
    }
    case actionTypes.DELETE_MANY_USERS_REQUEST: {
      return {
        ...state,
        isDeletingManyUser: true,
      };
    }
    case actionTypes.DELETE_MANY_USERS_SUCCESS: {
      const { isDeleted, ids } = payloads;
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
        isDeletedManyUser: isDeleted,
        deletedIds: ids,
        isDeletingManyUser: false,
      }
    }
    case actionTypes.DELETE_ONE_USER_REQUEST: {
      const { id } = payloads;

      return {
        ...state,
        isDeletingOneUser: true,
        isDeletingOneUserId: id,
      };
    }
    case actionTypes.DELETE_ONE_USER_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        isDeletingOneUser: false,
        error,
      };
    }
    case actionTypes.DELETE_ONE_USER_SUCCESS: {
      const { id, isDeleted } = payloads;
      let { dataList } = state;
      let { content } = dataList;

      content = content.filter(item => item.id !== id);

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
        deletedId: id,
        isDeletingOneUser: false,
        isDeletedOneUser: isDeleted,
      }
    }
    case actionTypes.CREATE_ONE_USER_SUCCESS: {
      const { user } = payloads;
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
    case actionTypes.UPDATE_ONE_USER_SUCCESS: {
      const { user } = payloads;
      const { dataList } = state;
      let { content } = dataList;
      let index = -1;
      content.forEach((item, idx) => {
        if (item.id === user.id) {
          index = idx;
          return;
        }
      });
      content[index] = user;

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
};