
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  isDeleted: false,
  isLoadingDelete: false,
  dataList: {},
};

export const personnelListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_PERSONNEL_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_PERSONNEL_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_PERSONNEL_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.DELETE_ONE_PERSONNEL_REQUEST: {
      const { id } = payloads;

      return {
        ...state,
        isDeletingOnePersonnel: true,
        isDeletingOnePersonnelId: id,
      };
    }
    case actionTypes.DELETE_ONE_PERSONNEL_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        isDeletingOnePersonnel: false,
        error,
      };
    }
    case actionTypes.DELETE_ONE_PERSONNEL_SUCCESS: {
      const { id, isDeleted } = payloads;
      let { dataList } = state;
      let { content } = dataList;

      content = content.filter(item => item.id !== id);

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
        deletedId: id,
        isDeletingOnePersonnel: false,
        isDeletedOnePersonnel: isDeleted,
      }
    }
    case actionTypes.PERSONNEL_EXPORT_EXCEL_REQUEST: {
      return {
        ...state,
        isExporting: true,
      };
    }
    case actionTypes.PERSONNEL_EXPORT_EXCEL_FAILURE: {
      const { error } = payloads;
      return {
        ...state,
        isExporting: true,
        error,
      };
    }
    case actionTypes.PERSONNEL_EXPORT_EXCEL_SUCCESS: {
      const { fileData } = payloads;
      
      return {
        ...state,
        isExporting: false,
        fileData,
      };
    }
    default:
      return state;
  }
};