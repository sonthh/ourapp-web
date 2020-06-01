import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyRoles = async () => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/roles`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOneRole = async (id) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/roles/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findManyPermissions = async () => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/roles/permissions`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateRoleScopes = async (roleId, scopeRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/roles/${roleId}/scopes`, scopeRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};