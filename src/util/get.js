import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from './auth';
import moment from 'moment';

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
  <Route
    {...rest}
    render={(props) => (checkAuth()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
    )}
  />
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

export const domains = {
  'USER': 'Nguời dùng',
  'PERSONNEL': 'Nhân sự',
  'ROLE': 'Nhóm quyền',
  'BRANCH': 'Chi nhánh',
  'DEPARTMENT': 'Phòng ban',
  'CONTRACT': 'Hợp đồng',
  'TIMEKEEPING': 'Chấm công'
};

export const actions = {
  'CREATE': 'Tạo',
  'UPDATE': 'Cập nhật',
  'READ': 'Xem',
  'DELETE': 'Xóa',
};

export const scopes = {
  'ALL': 'Tất cả',
  'PER': 'Sở hữu'
};

export const getPermissionGroup = (permissions) => {
  const arr = ['USER', 'PERSONNEL', 'ROLE', 'BRANCH', 'DEPARTMENT', 'CONTRACT', 'TIMEKEEPING'];
  let result = {};
  arr.forEach(each => result[each] = []);

  permissions.forEach(each => {
    const key = each.split('_')[1];

    if (arr.includes(key)) {
      const tmp = result[key] || [];

      result[key] = [
        ...tmp,
        each,
      ];
    }
  });

  return result;
}

export const getPermisionInVietnamees = per => {
  const tmp = per.split('_');

  const scope = tmp[0];
  const domain = tmp[1];
  const action = tmp[2];

  let result = '';
  result += actions[action] + ' ' + domains[domain].toLowerCase() + ` (${scopes[scope].toLowerCase()})`;

  return result;
}

export const getAvatarTextFromName = (name) => {
  let text = 'N';

  if (name && name.length > 0) {
    text = name[0].toUpperCase();
  }

  return text;
}

export const getFormRequestForDateFields = (dateFields = [], formValues) => {
  if (!formValues) return null;

  const result = { ...formValues };

  dateFields.forEach(each => {
    const value = result[each];
    if (!value)
      return;

    result[each] = moment(value).format('YYYY-MM-DD');
  });

  return result;
}

export const typeRequest = {
  'Advance': 'Tạm ứng lương',
  'OnLeave': 'Nghỉ phép',
};
