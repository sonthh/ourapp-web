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

export const updateTimeKeeping = async (personnelId, timeKeepingId, timeKeepingRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/timeKeeping/${personnelId}/update/${timeKeepingId}`, timeKeepingRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTimeKeeping = async (personnelId, timeKeepingId) => {
  try {
    const { data } = await axios
      .delete(`${config.API_URL}/timeKeeping/${personnelId}/delete/${timeKeepingId}`);

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

export const exportExcel = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/timeKeeping/export/excel`, {
        responseType: 'blob',
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
