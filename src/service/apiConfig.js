import axios from 'axios';
import { getCurrentUser } from '../util/auth';

axios.interceptors.request.use(config => {
  const { token } = getCurrentUser();
  config.headers['Authorization'] = `Bearer ${token}`;
  
  return config;
}, error => {
  console.log(error);
});

export default axios;