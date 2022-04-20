// offer 30
export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getMin() {
    if (this.isEmpty()) throw new Error("error");
    return this.queue[0];
  }
}

// quick sort
export function quickSort(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let left = l,
      i = l + 1,
      right = r + 1;
    while (i < right) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[i] > arr[l]) {
        right--;
        swap(arr, right, i);
      } else {
        i++;
      }
    }
    swap(arr, l, left);
    return {
      left: left - 1,
      right,
    };
  };
  sortArr(res, 0, res.length - 1);
  return res;
}

export function sortColors(colors: number[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let left = -1,
    right = colors.length,
    i = 0;
  while (i < right) {
    if (i === 0) {
      left++;
      swap(colors, left, i);
      i++;
    } else if (i === 2) {
      right--;
      swap(colors, right, i);
    } else {
      i++;
    }
  }
  return colors;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const arr = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return arr[l];
    const p = partition(arr, l, r);
    if (p === k) {
      return arr[k];
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr(arr, 0, arr.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return nums.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

// leetcode dp 6-10
export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseInt(s[i - 2] + s[i - 1]) > 26 ? 0 : dp[i - 2]);
  }
  return dp[s.length];
}

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function minimumTotal(triangle: number[]) {
  
}