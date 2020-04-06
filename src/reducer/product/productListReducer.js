
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  dataList: {},
}

export const productListReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.PRODUCTS_REQUEST:

      return {
        isLoading: true
      };
    case actionTypes.PRODUCTS_FAILURE:
      const { error } = action.payloads;

      return {
        error,
        isLoading: false
      };
    case actionTypes.FIND_MANY_PRODUCTS_SUCCESS:
      const { dataList } = action.payloads;

      return {
        dataList,
        isLoading: false,
      }
    default:
      return state;
  }
}