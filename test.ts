// 30

export class MinStack {
  data: number[];
  list: number[];
  constructor() {
    this.data = [];
    this.list = [];
  }
  push(item: number) {
    this.data.push(item);
    if (this.list.length === 0 || item <= this.list[0]) {
      this.list.unshift(item);
    }
  }
  pop() {
    if (this.data.length === 0) throw new Error("error");
    const res = this.data.pop()!;
    if (res === this.list[0]) {
      this.list.shift();
    }
    return res;
  }
  peek() {
    if (this.data.length === 0) throw new Error("error");
    return this.data[this.data.length - 1];
  }
  getSize() {
    return this.data.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  getMin() {
    return this.list[0];
  }
}

// search sort
export function isObject(obj: any) {
  return obj && typeof obj === "object";
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
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
    const current = res[i];
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
}

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j + 1] < res[j]) {
        swap(res, j + 1, j);
        flag = true;
      }

      if (!flag) {
        break;
      }
    }
  }
  return res;
}
