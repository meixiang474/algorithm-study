export function isObj(obj: any) {
  return typeof obj === "object" && obj !== null;
}

export function isEqual(obj1: any, obj2: any): boolean {
  if (!isObj(obj1) || !isObj(obj2)) return obj1 === obj2;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key in keys1) {
    if (obj1.hasOwnProperty(key)) {
      const flag = isEqual(obj1[key], obj2[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(arr: T[], target: T) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], target)) {
      return i;
    }
  }
  return -1;
}

export function selectionSort(arr: number[]) {
  const res = [...arr];
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

export function insertionSort(arr: number[]) {
  const res = [...arr];
  for (let i = 0; i < res.length; i++) {
    let swapIndex = i;
    let current = res[i];
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

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j] > res[j + 1]) {
        swap(res, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}
