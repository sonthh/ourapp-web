
import { actionTypes } from '../constant/actionTypes';
import * as personnelService from '../service/personnelService';

export const findManyPersonnel = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_PERSONNEL_REQUEST,
    });

    try {
      const dataList = await personnelService.findManyPersonnel(params);

      dispatch({
        type: actionTypes.FIND_MANY_PERSONNEL_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_PERSONNEL_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const createOneBasicInfo = (personnelRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_REQUEST,
    });

    try {
      const personnel = await personnelService.createOneBasicInfo(personnelRequest);

      dispatch({
        type: actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_SUCCESS,
        payloads: { personnel },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findOnePersonnel = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_ONE_PERSONNEL_REQUEST,
    });

    try {
      const personnel = await personnelService.findOnePersonnel(id);

      dispatch({
        type: actionTypes.FIND_ONE_PERSONNEL_SUCCESS,
        payloads: { personnel },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_ONE_PERSONNEL_FAILURE,
        payloads: { error },
      });
    }
  };
};


export const delteOnePersonnel = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ONE_PERSONNEL_REQUEST,
      payloads: { id },
    });

    try {
      const isDeleted = await personnelService.deleteOnePersonnel(id);

      dispatch({
        type: actionTypes.DELETE_ONE_PERSONNEL_SUCCESS,
        payloads: { isDeleted, id },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ONE_PERSONNEL_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateBasicInfo = (personnelId, basicInfo) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_BASIC_INFO_REQUEST,
    });

    try {
      const personnel = await personnelService.updateBasicInfo(personnelId, basicInfo);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_BASIC_INFO_SUCCESS,
        payloads: { personnel },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_BASIC_INFO_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addIndentification = (personnelId, idRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_REQUEST,
    });

    try {
      const isUpdated = await personnelService.addIdentification(personnelId, idRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateIndentification = (personnelId, idRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_REQUEST,
    });

    try {
      const isUpdated = await personnelService.updateIdentification(personnelId, idRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addPassport = (personnelId, passportRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_REQUEST,
    });

    try {
      const isUpdated = await personnelService.addPassport(personnelId, passportRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updatePassport = (personnelId, passportRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updatePassport(personnelId, passportRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addWorkingTime = (personnelId, workingTimeRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_REQUEST,
    });

    try {
      const isUpdated = await personnelService.addWorkingTime(personnelId, workingTimeRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateWorkingTime = (personnelId, workingTimeRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updateWorkingTime(personnelId, workingTimeRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_REQUEST,
        payloads: { error },
      });
    }
  };
};

export const addQualification = (personnelId, qualificationRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.addQualification(personnelId, qualificationRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateQualification = (personnelId, qualificationId, qualificationRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updateQualification(personnelId, qualificationId, qualificationRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const deleteQualification = (personnelId, qualificationId) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.deleteQualification(personnelId, qualificationId);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addCertification = (personnelId, certificationRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.addCertification(personnelId, certificationRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateCertification = (personnelId, certificationId, certificationRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updateCertification(personnelId, certificationId, certificationRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const deleteCertification = (personnelId, certificationId) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.deleteCertification(personnelId, certificationId);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addWorkHistory = (personnelId, workHistoryRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.addWorkHistory(personnelId, workHistoryRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateWorkHistory = (personnelId, workHistoryId, workHistoryRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updateWorkHistory(personnelId, workHistoryId, workHistoryRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const deleteWorkHistory = (personnelId, workHistoryId) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.deleteWorkHistory(personnelId, workHistoryId);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const addContactInfo = (personnelId, contactInfoRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_REQUEST,
    });

    try {
      const isUpdated = await personnelService.addContactInfo(personnelId, contactInfoRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateContactInfo = (personnelId, contactInfoRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_REQUEST,
    });;

    try {
      const isUpdated = await personnelService.updateContactInfo(personnelId, contactInfoRequest);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_SUCCESS,
        payloads: { isUpdated },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_REQUEST,
        payloads: { error },
      });
    }
  };
};

export const updateAvatar = (personnelId, formData) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_REQUEST,
    });

    try {
      const avatarUrl = await personnelService.updateAvatar(personnelId, formData);

      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_SUCCESS,
        payloads: { avatarUrl },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const exportExcel = (params) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.PERSONNEL_EXPORT_EXCEL_REQUEST,
    });

    try {
      const fileData = await personnelService.exportExcel(params);

      dispatch({
        type: actionTypes.PERSONNEL_EXPORT_EXCEL_SUCCESS,
        payloads: { fileData },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PERSONNEL_EXPORT_EXCEL_FAILURE,
        payloads: { error },
      });
    }
  };
};

