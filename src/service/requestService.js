import axios from './apiConfig';
import * as config from '../constant/config';

export const addRequest = async (requestPayload) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/requests`, requestPayload);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findManyRequests = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/requests`, { params });

    return data;
  } catch (error) {
    return Promise.reject(error)
  }
};

export const countRequests = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/requests/count`, { params });

    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
