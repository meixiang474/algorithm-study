export {};
function isObject(obj: any) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(obj1: any, obj2: any) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const res = isEqual(obj1[key], obj2[key]);
      if (!res) return false;
    }
  }
  return true;
}

function linearSearch<T>(data: T[], target: T) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) {
      return i;
    }
  }
  return -1;
}
