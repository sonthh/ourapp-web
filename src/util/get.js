import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from './auth';

// helper function for filtering data in ant design table components
export const getFilterObject = (keys = [], filterObject = {}) => {

  if (!filterObject) {
    return null;
  }

  let result = { ...filterObject };

  for (const key of keys) {
    if (!filterObject[key] || !filterObject[key][0]) {
      continue;
    }

    if (filterObject[key] == null) {
      delete filterObject[key];
    }

    result[key] = filterObject[key][0];
  }

  return result;
};

export const getErrorMessage = (error) => {

  if (error && error.response && error.response.data && error.response.data.errors) {
    return error.response.data.errors;
  }

  return null;
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
  )} />
);

export const getRequestArrayFromFormValues = (values, requestLength, prefixName) => {

  if (!values) return null;

  const arrRequest = new Array(requestLength);

  for (const key in values) {
    let value = values[key];
    for (let i = 0; i < requestLength; i++) {
      if (key.startsWith(`${prefixName}[${i}].`)) {
        arrRequest[i] = {
          ...arrRequest[i],
          [key.split('.')[1]]: value,
        }
        break;
      }
    }
  }

  return arrRequest;
};