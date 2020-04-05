import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

const headers = getHeaders();

export const findManyProducts = async (params = {}) => {
  try {
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

