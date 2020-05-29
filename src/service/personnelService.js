import axios from './apiConfig';
import * as config from '../constant/config';

export const findManyPersonnel = async (params = {}) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/personnel`, { params });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOneBasicInfo = async (personnelRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/personnel`, personnelRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findOnePersonnel = async (id) => {
  try {
    const { data } = await axios
      .get(`${config.API_URL}/personnel/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteOnePersonnel = async (id) => {
  try {
    const { data } = await axios
      .delete(`${config.API_URL}/personnel/${id}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBasicInfo = async (personnelId, basicInfo) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/basicInfo`, basicInfo);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addIdentification = async (personnelId, IdRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/identification/add`, IdRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateIdentification = async (personnelId, IdRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/identification/update`, IdRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPassport = async (personnelId, passportRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/passport/add`, passportRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePassport = async (personnelId, passportRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/passport/update`, passportRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addWorkingTime = async (personnelId, workingTimeRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/workingTime/add`, workingTimeRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateWorkingTime = async (personnelId, workingTimeRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/workingTime/update`, workingTimeRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addQualification = async (personnelId, qualificationRequest) => {
  try {
    const { data } = await axios
      .post(`${config.API_URL}/personnel/${personnelId}/qualifications`, qualificationRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateQualification = async (personnelId, qualificationId, qualificationRequest) => {
  try {
    const { data } = await axios
      .put(`${config.API_URL}/personnel/${personnelId}/qualifications/${qualificationId}`, qualificationRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteQualification = async (personnelId, qualificationId) => {
  try {
    const { data } = await axios
      .delete(`${config.API_URL}/personnel/${personnelId}/qualifications/${qualificationId}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
