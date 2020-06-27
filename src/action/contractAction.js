
import { actionTypes } from '../constant/actionTypes';
import * as contractService from '../service/contractService';

export const createOneContract = (contractRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ONE_CONTRACT_REQUEST,
    });

    try {
      const contract = await contractService.addContract(contractRequest);

      dispatch({
        type: actionTypes.CREATE_ONE_CONTRACT_SUCCESS,
        payloads: { contract },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ONE_CONTRACT_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const updateOneContract = (contractId, contractRequest) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ONE_CONTRACT_REQUEST,
    });

    try {
      const contract = await contractService.updateOneContract(contractId, contractRequest);

      dispatch({
        type: actionTypes.UPDATE_ONE_CONTRACT_SUCCESS,
        payloads: { contract },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ONE_CONTRACT_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findManyContracts = (params = {}) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_MANY_CONTRACTS_REQUEST,
    });

    try {
      const dataList = await contractService.findManyContracts(params);

      dispatch({
        type: actionTypes.FIND_MANY_CONTRACTS_SUCCESS,
        payloads: { dataList },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_MANY_CONTRACTS_FAILURE,
        payloads: { error },
      });
    }
  };
};

export const findOneContract = (id) => {

  return async (dispatch) => {
    dispatch({
      type: actionTypes.FIND_ONE_CONTRACT_REQUEST,
    });

    try {
      const contract = await contractService.findOneContract(id);

      dispatch({
        type: actionTypes.FIND_ONE_CONTRACT_SUCCESS,
        payloads: { contract },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_ONE_CONTRACT_FAILURE,
        payloads: { error },
      });
    }
  };
};
