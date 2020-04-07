
import { actionTypes } from '../constant/actionTypes';
import * as productService from '../service/productService';

export const findManyProducts = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_PRODUCTS_REQUEST,
    });

    try {
      const dataList = await productService.findManyProducts(params);

      dispatch({
        type: actionTypes.FIND_MANY_PRODUCTS_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      const errorData = error.response.data;

      dispatch({
        type: actionTypes.PRODUCTS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}

export const delteManyProducts = (ids) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_MANY_PRODUCTS_REQUEST,
    });

    try {
      const isDeleted = await productService.deleteManyProducts(ids);

      dispatch({
        type: actionTypes.DELETE_MANY_PRODUCTS_SUCCESS,
        payloads: { isDeleted, ids },
      });
    } catch (error) {
      const errorData = error.response;

      dispatch({
        type: actionTypes.PRODUCTS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}
