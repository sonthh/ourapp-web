
export const actionTypes = {
  // APP
  TOGGLE_MENU: 'TOGGLE_MENU',
  CHANGE_NAVIGATION_MODE: 'CHANGE_NAVIGATION_MODE',

  // USER
  USERS_FAILURE: 'USERS_FAILURE',

  FIND_MANY_USERS_REQUEST: 'FIND_MANY_USERS_REQUEST',
  FIND_MANY_USERS_SUCCESS: 'FIND_MANY_USERS_SUCCESS',
  FIND_MANY_USERS_FAILURE: 'FIND_MANY_USERS_FAILURE',

  DELETE_MANY_USERS_REQUEST: 'DELETE_MANY_USERS_REQUEST',
  DELETE_MANY_USERS_SUCCESS: 'DELETE_MANY_USERS_SUCCESS',

  DELETE_ONE_USER_REQUEST: 'DELETE_ONE_USER_REQUEST',
  DELETE_ONE_USER_SUCCESS: 'DELETE_ONE_USER_SUCCESS',
  DELETE_ONE_USER_FAILURE: 'DELETE_ONE_USER_FAILURE',


  FIND_ONE_USER_REQUEST: 'FIND_ONE_USER_REQUEST',
  FIND_ONE_USER_SUCCESS: 'FIND_ONE_USER_SUCCESS',

  CREATE_ONE_USER_SUCCESS: 'CREATE_ONE_USER_SUCCESS',
  CREATE_ONE_USER_FAILURE: 'CREATE_ONE_USER_FAILURE',
  CREATE_ONE_USER_REQUEST: 'CREATE_ONE_USER_REQUEST',

  UPDATE_ONE_USER_REQUEST: 'UPDATE_ONE_USER_REQUEST',
  UPDATE_ONE_USER_FAILURE: 'UPDATE_ONE_USER_FAILURE',
  UPDATE_ONE_USER_SUCCESS: 'UPDATE_ONE_USER_SUCCESS',

  UPDATE_MY_AVATAR_REQUEST: 'UPDATE_MY_AVATAR_REQUEST',
  UPDATE_MY_AVATAR_SUCCESS: 'UPDATE_MY_AVATAR_SUCCESS',
  UPDATE_MY_AVATAR_FAILURE: 'UPDATE_MY_AVATAR_FAILURE',

  FIND_USER_ME_SUCCESS: 'FIND_USER_ME_SUCCESS',
  FIND_USER_ME_REQUEST: 'FIND_USER_ME_REQUEST',
  FIND_USER_ME_FAILURE: 'FIND_USER_ME_FAILURE',

  UPDATE_USER_ME_SUCCESS: 'UPDATE_USER_ME_SUCCESS',
  UPDATE_USER_ME_REQUEST: 'UPDATE_USER_ME_REQUEST',
  UPDATE_USER_ME_FAILURE: 'UPDATE_USER_ME_FAILURE',

  //AUTH
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_FAILURE: 'AUTH_FAILURE',

  PASSWORD_LOGIN_SUCCESS: 'PASSWORD_LOGIN_SUCCESS',

  // ROLE
  FIND_MANY_ROLES_SUCCESS: 'FIND_MANY_ROLES_SUCCESS',
  FIND_ONE_ROLE_SUCCESS: 'FIND_ONE_ROLE_SUCCESS',

  FIND_MANY_PERMISSION_SUCCESS: 'FIND_MANY_PERMISSION_SUCCESS',
  UPDATE_ROLE_SCOPES_SUCCESS: 'UPDATE_ROLE_SCOPES_SUCCESS',
  UPDATE_ROLE_SCOPES_REQUEST: 'UPDATE_ROLE_SCOPES_REQUEST',
  UPDATE_ROLE_SCOPES_FAILURE: 'UPDATE_ROLE_SCOPES_FALURE',

  // PERSONNEL
  FIND_MANY_PERSONNEL_REQUEST: 'FIND_MANY_PERSONNEL_REQUEST',
  FIND_MANY_PERSONNEL_SUCCESS: 'FIND_MANY_PERSONNEL_SUCCESS',
  FIND_MANY_PERSONNEL_FAILURE: 'FIND_MANY_PERSONNEL_FAILURE',

  FIND_ONE_PERSONNEL_REQUEST: 'FIND_ONE_PERSONNEL_REQUEST',
  FIND_ONE_PERSONNEL_SUCCESS: 'FIND_ONE_PERSONNEL_SUCCESS',
  FIND_ONE_PERSONNEL_FAILURE: 'FIND_ONE_PERSONNEL_FAILURE',

  DELETE_ONE_PERSONNEL_REQUEST: 'DELETE_ONE_PERSONNEL_REQUEST',
  DELETE_ONE_PERSONNEL_SUCCESS: 'DELETE_ONE_PERSONNEL_SUCCESS',
  DELETE_ONE_PERSONNEL_FAILURE: 'DELETE_ONE_PERSONNEL_FAILURE',

  UPDATE_PERSONNEL_BASIC_INFO_REQUEST: 'UPDATE_PERSONNEL_BASIC_INFO_REQUEST',
  UPDATE_PERSONNEL_BASIC_INFO_SUCCESS: 'UPDATE_PERSONNEL_BASIC_INFO_SUCCESS',
  UPDATE_PERSONNEL_BASIC_INFO_FAILURE: 'UPDATE_PERSONNEL_BASIC_INFO_FAILURE',

  UPDATE_PERSONNEL_ADD_INDENTIFICATION_REQUEST: 'UPDATE_PERSONNEL_ADD_INDENTIFICATION_REQUEST',
  UPDATE_PERSONNEL_ADD_INDENTIFICATION_SUCCESS: 'UPDATE_PERSONNEL_ADD_INDENTIFICATION_SUCCESS',
  UPDATE_PERSONNEL_ADD_INDENTIFICATION_FAILURE: 'UPDATE_PERSONNEL_ADD_INDENTIFICATION_FAILURE',

  UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_REQUEST: 'UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_REQUEST',
  UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_FAILURE: 'UPDATE_PERSONNEL_UPDATE_INDENTIFICATION_FAILURE',

  UPDATE_PERSONNEL_ADD_PASSPORT_REQUEST: 'UPDATE_PERSONNEL_ADD_PASSPORT_REQUEST',
  UPDATE_PERSONNEL_ADD_PASSPORT_SUCCESS: 'UPDATE_PERSONNEL_ADD_PASSPORT_SUCCESS',
  UPDATE_PERSONNEL_ADD_PASSPORT_FAILURE: 'UPDATE_PERSONNEL_ADD_PASSPORT_FAILURE',

  UPDATE_PERSONNEL_UPDATE_PASSPORT_REQUEST: 'UPDATE_PERSONNEL_UPDATE_PASSPORT_REQUEST',
  UPDATE_PERSONNEL_UPDATE_PASSPORT_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_PASSPORT_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_PASSPORT_FAILURE: 'UPDATE_PERSONNEL_UPDATE_PASSPORT_FAILURE',

  UPDATE_PERSONNEL_ADD_WOKRING_TIME_REQUEST: 'UPDATE_PERSONNEL_ADD_WOKRING_TIME_REQUEST',
  UPDATE_PERSONNEL_ADD_WOKRING_TIME_SUCCESS: 'UPDATE_PERSONNEL_ADD_WOKRING_TIME_SUCCESS',
  UPDATE_PERSONNEL_ADD_WOKRING_TIME_FAILURE: 'UPDATE_PERSONNEL_ADD_WOKRING_TIME_FAILURE',

  UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_REQUEST: 'UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_REQUEST',
  UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_FAILURE: 'UPDATE_PERSONNEL_UPDATE_WOKRING_TIME_FAILURE',

  UPDATE_PERSONNEL_ADD_QUALIFICATION_REQUEST: 'UPDATE_PERSONNEL_ADD_QUALIFICATION_REQUEST',
  UPDATE_PERSONNEL_ADD_QUALIFICATION_SUCCESS: 'UPDATE_PERSONNEL_ADD_QUALIFICATION_SUCCESS',
  UPDATE_PERSONNEL_ADD_QUALIFICATION_FAILURE: 'UPDATE_PERSONNEL_ADD_QUALIFICATION_FAILURE',

  UPDATE_PERSONNEL_UPDATE_QUALIFICATION_REQUEST: 'UPDATE_PERSONNEL_UPDATE_QUALIFICATION_REQUEST',
  UPDATE_PERSONNEL_UPDATE_QUALIFICATION_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_QUALIFICATION_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_QUALIFICATION_FAILURE: 'UPDATE_PERSONNEL_UPDATE_QUALIFICATION_FAILURE',

  UPDATE_PERSONNEL_DELETE_QUALIFICATION_REQUEST: 'UPDATE_PERSONNEL_DELETE_QUALIFICATION_REQUEST',
  UPDATE_PERSONNEL_DELETE_QUALIFICATION_SUCCESS: 'UPDATE_PERSONNEL_DELETE_QUALIFICATION_SUCCESS',
  UPDATE_PERSONNEL_DELETE_QUALIFICATION_FAILURE: 'UPDATE_PERSONNEL_DELETE_QUALIFICATION_FAILURE',

  UPDATE_PERSONNEL_ADD_CERTIFICATION_REQUEST: 'UPDATE_PERSONNEL_ADD_CERTIFICATION_REQUEST',
  UPDATE_PERSONNEL_ADD_CERTIFICATION_SUCCESS: 'UPDATE_PERSONNEL_ADD_CERTIFICATION_SUCCESS',
  UPDATE_PERSONNEL_ADD_CERTIFICATION_FAILURE: 'UPDATE_PERSONNEL_ADD_CERTIFICATION_FAILURE',

  UPDATE_PERSONNEL_UPDATE_CERTIFICATION_REQUEST: 'UPDATE_PERSONNEL_UPDATE_CERTIFICATION_REQUEST',
  UPDATE_PERSONNEL_UPDATE_CERTIFICATION_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_CERTIFICATION_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_CERTIFICATION_FAILURE: 'UPDATE_PERSONNEL_UPDATE_CERTIFICATION_FAILURE',

  UPDATE_PERSONNEL_DELETE_CERTIFICATION_REQUEST: 'UPDATE_PERSONNEL_DELETE_CERTIFICATION_REQUEST',
  UPDATE_PERSONNEL_DELETE_CERTIFICATION_SUCCESS: 'UPDATE_PERSONNEL_DELETE_CERTIFICATION_SUCCESS',
  UPDATE_PERSONNEL_DELETE_CERTIFICATION_FAILURE: 'UPDATE_PERSONNEL_DELETE_CERTIFICATION_FAILURE',

  UPDATE_PERSONNEL_ADD_WORK_HISTORY_REQUEST: 'UPDATE_PERSONNEL_ADD_WORK_HISTORY_REQUEST',
  UPDATE_PERSONNEL_ADD_WORK_HISTORY_SUCCESS: 'UPDATE_PERSONNEL_ADD_WORK_HISTORY_SUCCESS',
  UPDATE_PERSONNEL_ADD_WORK_HISTORY_FAILURE: 'UPDATE_PERSONNEL_ADD_WORK_HISTORY_FAILURE',

  UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_REQUEST: 'UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_REQUEST',
  UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_FAILURE: 'UPDATE_PERSONNEL_UPDATE_WORK_HISTORY_FAILURE',

  UPDATE_PERSONNEL_DELETE_WORK_HISTORY_REQUEST: 'UPDATE_PERSONNEL_DELETE_WORK_HISTORY_REQUEST',
  UPDATE_PERSONNEL_DELETE_WORK_HISTORY_SUCCESS: 'UPDATE_PERSONNEL_DELETE_WORK_HISTORY_SUCCESS',
  UPDATE_PERSONNEL_DELETE_WORK_HISTORY_FAILURE: 'UPDATE_PERSONNEL_DELETE_WORK_HISTORY_FAILURE',

  UPDATE_PERSONNEL_ADD_CONTACT_INFO_REQUEST: 'UPDATE_PERSONNEL_ADD_CONTACT_INFO_REQUEST',
  UPDATE_PERSONNEL_ADD_CONTACT_INFO_SUCCESS: 'UPDATE_PERSONNEL_ADD_CONTACT_INFO_SUCCESS',
  UPDATE_PERSONNEL_ADD_CONTACT_INFO_FAILURE: 'UPDATE_PERSONNEL_ADD_CONTACT_INFO_FAILURE',

  UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_REQUEST: 'UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_REQUEST',
  UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_FAILURE: 'UPDATE_PERSONNEL_UPDATE_CONTACT_INFO_FAILURE',

  UPDATE_PERSONNEL_UPDATE_AVATAR_FAILURE: 'UPDATE_PERSONNEL_UPDATE_AVATAR_FAILURE',
  UPDATE_PERSONNEL_UPDATE_AVATAR_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_AVATAR_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_AVATAR_REQUEST: 'UPDATE_PERSONNEL_UPDATE_AVATAR_REQUEST',

  PERSONNEL_EXPORT_EXCEL_REQUEST: 'PERSONNEL_EXPORT_EXCEL_REQUEST',
  PERSONNEL_EXPORT_EXCEL_SUCCESS: 'PERSONNEL_EXPORT_EXCEL_SUCCESS',
  PERSONNEL_EXPORT_EXCEL_FAILURE: 'PERSONNEL_EXPORT_EXCEL_FAILURE',

  UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_REQUEST: 'UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_REQUEST',
  UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_SUCCESS: 'UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_SUCCESS',
  UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_FAILURE: 'UPDATE_PERSONNEL_ADD_HEALTHY_STATUS_FAILURE',

  UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_REQUEST: 'UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_REQUEST',
  UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_FAILURE: 'UPDATE_PERSONNEL_UPDATE_HEALTHY_STATUS_FAILURE',

  UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_REQUEST: 'UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_REQUEST',
  UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_SUCCESS: 'UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_SUCCESS',
  UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_FAILURE: 'UPDATE_PERSONNEL_ADD_ADDITIONAL_INFO_FAILURE',

  UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_REQUEST: 'UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_REQUEST',
  UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_SUCCESS: 'UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_SUCCESS',
  UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_FAILURE: 'UPDATE_PERSONNEL_UPDATE_ADDITIONAL_INFO_FAILURE',

  // BRANCHES
  FIND_MANY_BRANCHES_REQUEST: 'FIND_MANY_BRANCHES_REQUEST',
  FIND_MANY_BRANCHES_SUCCESS: 'FIND_MANY_BRANCHES_SUCCESS',
  FIND_MANY_BRANCHES_FAILURE: 'FIND_MANY_BRANCHES_FAILURE',

  CREATE_ONE_BRANCH_REQUEST: 'CREATE_ONE_BRANCH_REQUEST',
  CREATE_ONE_BRANCH_SUCCESS: 'CREATE_ONE_BRANCH_SUCCESS',
  CREATE_ONE_BRANCH_FAILURE: 'CREATE_ONE_BRANCH_FAILURE',

  FIND_ONE_BRANCH_REQUEST: 'FIND_ONE_BRANCH_REQUEST',
  FIND_ONE_BRANCH_SUCCESS: 'FIND_ONE_BRANCH_SUCCESS',
  FIND_ONE_BRANCH_FAILURE: 'FIND_ONE_BRANCH_FAILURE',

  UPDATE_ONE_BRANCH_REQUEST: 'UPDATE_ONE_BRANCH_REQUEST',
  UPDATE_ONE_BRANCH_SUCCESS: 'UPDATE_ONE_BRANCH_SUCCESS',
  UPDATE_ONE_BRANCH_FAILURE: 'UPDATE_ONE_BRANCH_FAILURE',

  // DEPARTMENTS
  FIND_MANY_DEPARTMENTS_REQUEST: 'FIND_MANY_DEPARTMENTS_REQUEST',
  FIND_MANY_DEPARTMENTS_SUCCESS: 'FIND_MANY_DEPARTMENTS_SUCCESS',
  FIND_MANY_DEPARTMENTS_FAILURE: 'FIND_MANY_DEPARTMENTS_FAILURE',

  CREATE_ONE_PERSONNEL_BASIC_INFO_REQUEST: 'CREATE_ONE_PERSONNEL_BASIC_INFO_REQUEST',
  CREATE_ONE_PERSONNEL_BASIC_INFO_FAILURE: 'CREATE_ONE_PERSONNEL_BASIC_INFO_FAILURE',
  CREATE_ONE_PERSONNEL_BASIC_INFO_SUCCESS: 'CREATE_ONE_PERSONNEL_BASIC_INFO_SUCCESS',


  // CONTRACTS
  CREATE_ONE_CONTRACT_REQUEST: 'CREATE_ONE_CONTRACT_REQUEST',
  CREATE_ONE_CONTRACT_SUCCESS: 'CREATE_ONE_CONTRACT_SUCCESS',
  CREATE_ONE_CONTRACT_FAILURE: 'CREATE_ONE_CONTRACT_FAILURE',

  FIND_MANY_CONTRACTS_REQUEST: 'FIND_MANY_CONTRACTS_REQUEST',
  FIND_MANY_CONTRACTS_SUCCESS: 'FIND_MANY_CONTRACTS_SUCCESS',
  FIND_MANY_CONTRACTS_FAILURE: 'FIND_MANY_CONTRACTS_FAILURE',

  CREATE_ONE_TIME_KEEPING_REQUEST: 'CREATE_ONE_TIME_KEEPING_REQUEST',
  CREATE_ONE_TIME_KEEPING_SUCCESS: 'CREATE_ONE_TIME_KEEPING_SUCCESS',
  CREATE_ONE_TIME_KEEPING_FAILURE: 'CREATE_ONE_TIME_KEEPING_FAILURE',

  FIND_TIME_KEEPING_REQUEST: 'FIND_TIME_KEEPING_REQUEST',
  FIND_TIME_KEEPING_SUCCESS: 'FIND_TIME_KEEPING_SUCCESS',
  FIND_TIME_KEEPING_FAILURE: 'FIND_TIME_KEEPING_FAILURE',

  UPDATE_ONE_TIME_KEEPING_REQUEST: 'UPDATE_ONE_TIME_KEEPING_REQUEST',
  UPDATE_ONE_TIME_KEEPING_SUCCESS: 'UPDATE_ONE_TIME_KEEPING_SUCCESS',
  UPDATE_ONE_TIME_KEEPING_FAILURE: 'UPDATE_ONE_TIME_KEEPING_FAILURE',

  DELETE_ONE_TIME_KEEPING_REQUEST: 'DELETE_ONE_TIME_KEEPING_REQUEST',
  DELETE_ONE_TIME_KEEPING_SUCCESS: 'DELETE_ONE_TIME_KEEPING_SUCCESS',
  DELETE_ONE_TIME_KEEPING_FAILURE: 'DELETE_ONE_TIME_KEEPING_FAILURE',
}
