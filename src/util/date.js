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
