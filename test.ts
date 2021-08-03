// 3
export const findRepeatNumber = (nums: number[]) => {
  const map = new Map<number, boolean>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (map.has(current)) {
      return current;
    }
    map.set(current, true);
  }
};

// 4
export const findNumberIn2DArray = (matrix: number[][], target: number) => {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number): boolean => {
    if (r < 0 || r >= m || c < 0 || c >= n) return false;
    if (matrix[r][c] === target) {
      return true;
    } else if (matrix[r][c] < target) {
      return dfs(r + 1, c);
    } else {
      return dfs(r, c - 1);
    }
  };
  return dfs(0, n - 1);
};

export const isObject = (obj: any) => {
  return typeof obj === "object" && obj;
};

export const isEqual = (obj1: any, obj2: any) => {
  if (!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;
  const keys1 = Object.keys(obj1).length;
  const keys2 = Object.keys(obj2).length;
  if (keys1 === keys2) return false;
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const flag = isEqual(obj1[key], obj2[key]);
      if (!flag) return false;
    }
  }
  return true;
};

export const linearSearch = (data: any[], target: any) => {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) {
      return i;
    }
  }
  return -1;
};

export const swap = (arr: any[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const selectionSort = (arr: number[]) => {
  const res = [...arr];
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(res, minIndex, i);
    }
  }
  return res;
};

export const insertionSort = (arr: number[]) => {
  const res = [...arr];
  for (let i = 0; i < res.length; i++) {
    let swapIndex = i;
    let current = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        swapIndex = j;
        res[j + 1] = res[j];
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
};

export const bubbleSort = (arr: number[]) => {
  const res = [...arr];
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j + 1] < res[j]) {
        swap(res, j, j + 1);
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  return res;
};
