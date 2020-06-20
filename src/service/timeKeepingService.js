import axios from './apiConfig';
import * as config from '../constant/config';

export const createTimeKeeping = async (personnelId, timeKeepingRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/timeKeeping/${personnelId}/add`, timeKeepingRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findTimeKeeping = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/timeKeeping`, { params });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
