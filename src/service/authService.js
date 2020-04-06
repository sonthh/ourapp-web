import axios from 'axios';
import * as config from '../constant/config'
import { getHeaders } from '../util/auth'

const headers = getHeaders();

export const passwordLogin = async (loginData) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/auth/login`, loginData);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const userMe = async () => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/users/me`, {
        headers,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const subscribeFirebaseToken = async (token) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/users/me/token/subscribe`, { token }, { headers });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

