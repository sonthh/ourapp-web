import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyDepartments = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/departments`, {
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
