
export const checkIsEmptyObj = (obj) => {
  if (obj === undefined) {
    return true;
  }

  if (obj === null) {
    return true;
  }

  if (Object.keys(obj).length === 0) {
    return true;
  }

  const checkNull = Object.keys(obj).every(key => obj[key] === null);
  
  if (checkNull === true) {
    return true;
  }

  return false;
};