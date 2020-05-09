import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyPersonnel = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/personnel`, { params });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
