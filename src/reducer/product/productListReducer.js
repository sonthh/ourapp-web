
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  dataList: {},
}

export const productListReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.PRODUCTS_FAILURE: {
      const { error } = action.payloads;

      return {
        ...state,
        error,
        isLoading: false
      };
    }
    case actionTypes.FIND_MANY_PRODUCTS_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_PRODUCTS_SUCCESS: {
      const { dataList } = action.payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      }
    }
    case actionTypes.DELETE_MANY_PRODUCTS_REQUEST: {

      return {
        ...state,
        isLoadingDelete: true
      };
    }
    case actionTypes.DELETE_MANY_PRODUCTS_SUCCESS: {
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
    default:
      return state;
  }
}