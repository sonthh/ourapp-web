import React from 'react';
import { Redirect } from 'react-router-dom';

export const HomePage = (props) => {
  return <Redirect to='/admin/working-day/timekeeping' />
};
