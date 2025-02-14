
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  item: {},
};

export const personnelItemReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_SUCCESS: {
      const { personnel } = payloads;

      return {
        ...state,
        isCreating: false,
        success: 'Tạo thành công',
        item: personnel,
      }
    }
    case actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isCreating: false,
        success: undefined,
      }
    }
    case actionTypes.CREATE_ONE_PERSONNEL_BASIC_INFO_REQUEST: {
      return {
        ...state,
        isCreating: true,
        success: undefined,
      }
    }
    case actionTypes.FIND_ONE_PERSONNEL_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionTypes.FIND_ONE_PERSONNEL_SUCCESS: {
      const { personnel } = payloads;
      return {
        ...state,
        isLoading: false,
        item: personnel,
      }
    }
    case actionTypes.FIND_ONE_PERSONNEL_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_BASIC_INFO_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_BASIC_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_BASIC_INFO_SUCCESS: {
      // const { personnel } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        // item: personnel,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_INDENTIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_PASSPORT_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_PASSPORT_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WOKRING_TIME_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_QUALIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_QUALIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_QUALIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Xóa thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CERTIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CERTIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_CERTIFICATION_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Xóa thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_WORK_HISTORY_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_WORK_HISTORY_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Xóa thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_CONTACT_INFO_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_REQUEST: {
      return {
        ...state,
        isUploadingAvatar: true,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_SUCCESS: {
      const { avatarUrl } = payloads;
      return {
        ...state,
        isUploadingAvatar: false,
        avatarUrl,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_AVATAR_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isUploadingAvatar: false,
        error,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_SALARY_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_SALARY_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_SALARY_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_SALARY_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_SALARY_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_SALARY_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ALLOWANCE_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ALLOWANCE_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_ADD_ALLOWANCE_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ALLOWANCE_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ALLOWANCE_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_UPDATE_ALLOWANCE_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Cập nhật thành công',
        isUpdated,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_ALLOWANCE_REQUEST: {
      return {
        ...state,
        isUpdating: true,
        success: undefined,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_ALLOWANCE_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        error,
        isUpdating: false,
      }
    }
    case actionTypes.UPDATE_PERSONNEL_DELETE_ALLOWANCE_SUCCESS: {
      const { isUpdated } = payloads;
      return {
        ...state,
        isUpdating: false,
        success: 'Xóa thành công',
        isUpdated,
      }
    }
    default:
      return state;
  }
};