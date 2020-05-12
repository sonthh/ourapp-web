import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyBranches = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/branches`, {
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOneBranch = async (branchRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/branches`, branchRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOneBranch = async (id) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/branches/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOneBranch = async (branchRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/branches/${branchRequest.id}`, branchRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

