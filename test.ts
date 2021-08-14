// 14-II
export function cuttingRope(n: number) {
  const arr = [0, 0, 1, 2, 4];
  if (n < 5) {
    return arr[n];
  }
  let res = 1;
  while (n >= 5) {
    res = res * 3;
    n -= 3;
  }
  return res * n;
}

// 14-I
export function hammingWeight(num: number) {
  return num
    .toString(2)
    .split("")
    .reduce((memo, current) => {
      if (current === "1") {
        memo++;
      }
      return memo;
    }, 0);
}

// quicksort

export function quickSort(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  };

  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l);
  };

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[l] > arr[i]) {
        i++;
      }
      while (j >= i && arr[l] < arr[j]) {
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
  const res = [...arr];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };
  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l);
  };
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
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
        swap(arr, i, right);
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
  const res = [...arr];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function sortColors(arr: (0 | 1 | 2)[]) {
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  let l = -1,
    i = 0,
    r = arr.length;
  while (i < r) {
    if (arr[i] === 0) {
      l++;
      swap(arr, i, l);
      i++;
    } else if (arr[i] === 2) {
      r--;
      swap(arr, i, r);
    } else {
      i++;
    }
  }
  return arr;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const arr = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return arr[l];
    const p = partition(arr, l, r);
    if (p === k) {
      return arr[p];
    } else if (p < k) {
      return sortArr(arr, p + 1, r);
    } else {
      return sortArr(arr, l, p - 1);
    }
  };
  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l);
  };
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (j >= i && arr[j] > arr[l]) {
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

export function findKmin(nums: number[], k: number) {
  if (k >= nums.length) return [...nums];
  const arr = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return nums.slice(0, p);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l);
  };
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (j >= i && arr[j] > arr[l]) {
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
