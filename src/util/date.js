import moment from 'moment';

export const getDateFormat = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format('MMMM DD YYYY');
};

export const getArrayDatesOfWeek = (date) => {
  if (!date) {
    return [];
  }
  const current = date.clone();

  const startOfWeek = current.clone().startOf('isoWeek');
  const endOfWeek = current.clone().endOf('isoWeek');

  const days = [];
  let day = startOfWeek;
  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }

  return days;
};


export const getArrayDatesOfMonth = (date) => {
  if (!date) {
    return [];
  }
  const current = date.clone();

  const startOfMonth = current.clone().startOf('month');
  const endOfMonth = current.clone().endOf('month');

  const days = [];
  let day = startOfMonth;
  while (day <= endOfMonth) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }

  return days;
};

export const getDateFormatForTimeKeeping = (date, type) => {
  if (!date) {
    return null;
  }

  if (type === 'week') {
    let T = date.getDay();
    T === 0 ? (T = 'CN') : (T = 'T' + (T + 1));
    return T + ' ' + moment(date).format('D/M');
  }

  if (type === 'month') {
    let T = date.getDay();
    T === 0 ? (T = 'CN') : (T = 'T' + (T + 1));
    return T + ' ' + moment(date).format('D');
  }

  return null;
}