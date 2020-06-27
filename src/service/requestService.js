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
