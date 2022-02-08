// offer 10-I
export function fib(n: number) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// quick sort
export function quickSort(nums: number[]) {
  const res = [...nums];
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
    swap(arr, p, l);
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
    swap(arr, j, l);
    return j;
  };
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(nums: number[]) {
  const res = [...nums];
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
    let i = l + 1,
      left = l,
      right = r + 1;
    while (i < right) {
      if (arr[l] > arr[i]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[l] < arr[i]) {
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

export function sortColors(colors: (1 | 2 | 0)[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let l = -1,
    i = 0,
    r = colors.length;
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(colors, l, i);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(colors, r, i);
    } else {
      i++;
    }
  }
  return colors;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
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
  return sortArr([...nums], 0, nums.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return [...nums];
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
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
      if (i <= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

// binary search 1 - 5
export function myPow(x: number, n: number) {
  const isNegative = n < 0;
  n = Math.abs(n);
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  const res = absPow(x, n);
  return isNegative ? 1 / res : res;
}

export function mySqrt(x: number) {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= x) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

export function twoSum(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const left = nums[l];
    const right = nums[r];
    const sum = left + right;
    if (sum === target) {
      return [l + 1, r + 1];
    } else if (sum > target) {
      r--;
    } else {
      l++;
    }
  }
}
