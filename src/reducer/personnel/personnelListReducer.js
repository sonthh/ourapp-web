
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
    default:
      return state;
  }
};