import axios from 'axios';
import * as config from '../constant/config'

export const passwordLogin = async (loginData) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/auth/login`, loginData);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
