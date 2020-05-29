import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyUsers = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/users`, {
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOneUser = async (id) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/users/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteManyUsers = async (ids) => {
  try {
    const { data } = await axios
      .delete(`${config.API_URL}/users`, { data: { ids } });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteOneUser = async (id) => {
  try {
    const { data } = await axios
      .delete(`${config.API_URL}/users/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOneUser = async (userRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/users`, userRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOneUser = async (userRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/users/${userRequest.id}`, userRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMyAvatar = async (formData) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/users/me/avatar`, formData);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findUserMe = async () => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/users/me`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserMe = async (userRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/users/me`, userRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

