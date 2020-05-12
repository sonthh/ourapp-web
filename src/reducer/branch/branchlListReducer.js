
import { actionTypes } from '../../constant/actionTypes';

const initialState = {
  isLoading: false,
  dataList: {},
};

export const branchListReducer = (state = initialState, { type, payloads }) => {

  switch (type) {
    case actionTypes.FIND_MANY_BRANCHES_FAILURE: {
      const { error } = payloads;

      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case actionTypes.FIND_MANY_BRANCHES_REQUEST: {

      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.FIND_MANY_BRANCHES_SUCCESS: {
      const { dataList } = payloads;

      return {
        ...state,
        dataList,
        isLoading: false,
      }
    }
    case actionTypes.CREATE_ONE_BRANCH_SUCCESS: {
      const { branch } = payloads;
      const { dataList } = state;
      let { content } = dataList;
      content = [branch, ...content]

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
      }
    }
    case actionTypes.UPDATE_ONE_BRANCH_SUCCESS: {
      const { branch } = payloads;
      const { dataList } = state;
      let { content } = dataList;

      let index = -1;
      content.forEach((item, idx) => {
        if (item.id === branch.id) {
          index = idx;
          return;
        }
      });
      content[index] = branch;

      return {
        ...state,
        dataList: {
          ...dataList,
          content,
        },
      }
    }
    default:
      return state;
  }
};