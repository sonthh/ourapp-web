import axios from './apiConfig';
import * as config from '../constant/config';

export const addContract = async (contractRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/contracts`, contractRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findManyContracts = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/contracts`, { params });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

