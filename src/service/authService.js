import axios from './apiConfig';
import * as config from '../constant/config';

export const passwordLogin = async (loginData) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/auth/login`, loginData);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userMe = async () => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/users/me`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subscribeFirebaseToken = async (token) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/users/me/token/subscribe`, { token });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

