export const moveElement = (arr, fromIndex, toIndex) => {

  if (fromIndex < 0 || fromIndex > arr.length)
    return arr;

  if (toIndex < 0 || toIndex > arr.length)
    return arr;

  const element = arr[fromIndex];

  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
}