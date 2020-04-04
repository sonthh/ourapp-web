import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from './auth';

// helper function for filtering data in ant design table components
export const getFilterObject = (keys = [], filterObject = {}) => {

  let result = { ...filterObject };

  for (const key of keys) {
    if (!filterObject[key] || !filterObject[key][0]) {
      continue;
    }

    result[key] = filterObject[key][0];
  }

  return result;
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth()
      ? <Component {...props} />
      : <Redirect to='/auth/login' />
  )} />
);
