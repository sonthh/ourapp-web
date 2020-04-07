import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

export const findManyProducts = async (params = {}) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/products`, {
        headers,
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const deleteManyProducts = async (ids) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .delete(`${config.API_URL}/products`, { data: { ids }, headers });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

