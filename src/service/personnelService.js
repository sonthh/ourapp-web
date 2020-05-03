import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

export const findManyPersonnel = async (params = {}) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/personnel`, {
        headers,
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
