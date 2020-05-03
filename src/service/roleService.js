import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

export const findManyRoles = async () => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/roles`, {
        headers,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOneRole = async (id) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/roles/${id}`, {
        headers,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
