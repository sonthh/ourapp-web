import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

export const findManyUsers = async (params = {}) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/users`, {
        headers,
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOneUser = async (id) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .get(`${config.API_URL}/users/${id}`, {
        headers,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteManyUsers = async (ids) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .delete(`${config.API_URL}/users`, { data: { ids }, headers });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};


export const createOneUser = async (userRequest) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .post(`${config.API_URL}/users`, userRequest, { headers });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOneUser = async (userRequest) => {
  try {
    const headers = getHeaders();

    const { data } = await axios
      .put(`${config.API_URL}/users/${userRequest.id}`, userRequest, { headers });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
