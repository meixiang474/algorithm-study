// offer 3
export function findRepeatNumber(nums: number[]) {
  const map = new Map<number, boolean>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (map.has(current)) {
      return current;
    }
    map.set(current, true);
  }
}

// simple search sort
export function isObject<T>(obj: T) {
  return obj && typeof obj === "object";
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if (keys1.length !== keys2.length) return false;
  for (let key in a) {
    if (a.hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(data: T[], target: T) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) {
      return i;
    }
  }
  return -1;
}

export function selectionSort(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
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
}

export function insertionSort(nums: number[]) {
  const res = [...nums];
  for (let i = 0; i < res.length; i++) {
    let swapIndex = i;
    const current = res[i];
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < nums.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (res[j] > res[j + 1]) {
        flag = true;
        swap(res, j, j + 1);
      }
    }
    if (!flag) break;
  }
  return res;
}
