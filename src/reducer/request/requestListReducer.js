
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
  countRequest: {},
};

export const requestListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_REQUEST_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_REQUEST_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_REQUEST_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.COUNT_REQUEST_REQUEST: {

      return {
        ...state,
      };
    }
    case actionTypes.COUNT_REQUEST_SUCCESS: {
      const { countRequest } = payloads;

      return {
        ...state,
        countRequest,
      };
    }
    case actionTypes.COUNT_REQUEST_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
      };
    }
    case actionTypes.UPDATE_ONE_REQUEST_SUCCESS: {
      const { requestId, request } = payloads;

      let { dataList, countRequest } = state;
      let { content } = dataList;

      let { waiting, approved, rejected } = countRequest;

      if (waiting) {
        waiting = waiting - 1;
      }

      if (request.status === 'Chấp thuận') {
        approved = approved + 1;
      }

      if (request.status === 'Từ chối') {
        rejected = rejected + 1;
      }

      content = content.filter(item => item.id !== requestId);

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
        countRequest: {
          approved, waiting, rejected,
        }
      }
    }
    case actionTypes.DELETE_ONE_REQUEST_REQUEST: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    case actionTypes.DELETE_ONE_REQUEST_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isDeleting: false,
        error,
      };
    }
    case actionTypes.DELETE_ONE_REQUEST_SUCCESS: {
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
        isDeleted,
        isDeleting: false,
      }
    }
    default:
      return state;
  }
};
