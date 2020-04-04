
import { actionTypes } from '../constant/actionTypes';
import * as productService from '../service/productService';

export const findManyProducts = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_PRODUCTS,
    });

    try {const dataList = await productService.findManyProducts(params);      

      dispatch({
        type: actionTypes.FIND_MANY_PRODUCTS_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      const errorData = error.response.data;
      
      dispatch({
        type: actionTypes.FIND_MANY_PRODUCTS_FAILURE,
        payloads: { error: errorData },
      });
    }
  }
}
