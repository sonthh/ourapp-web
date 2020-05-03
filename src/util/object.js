export const setAll = (obj, val) => {

  const object = { ...obj };

  Object.keys(object).forEach(key => object[key] = val);

  return object;
};
