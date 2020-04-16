import moment from 'moment';

export const getDateFormat = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format('MMMM DD YYYY');
};