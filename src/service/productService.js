import axios from 'axios';
import * as config from '../constant/config'

export const findManyProducts = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/products`, {
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4NTgxNjY3NCwiZXhwIjoxNTg2NDIxNDc0fQ.jhKao3VR7bCxa-u9PMfzTuPSbMmcdArJvV0hYW96-l5ogTFbNFSoVH68w3fGevY8je7AkFkEq8glG40Itdwlog' },
        params,
      });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
