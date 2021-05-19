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
  const res = [...arr];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort2(arr: number[]) {
  const res = [...arr];
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

export function sortColors(nums: number[]) {
  let left = -1,
    i = 0,
    right = nums.length;
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  while (i < right) {
    if (nums[i] === 0) {
      left++;
      swap(nums, i, left);
      i++;
    } else if (nums[i] === 2) {
      right--;
      swap(nums, i, right);
    } else {
      i++;
    }
  }
  return nums;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const res = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return arr[k];
    const p = partition(arr, l, r);
    if (p === k) {
      return arr[k];
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
  return sortArr(res, 0, res.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return [...nums];
  const res = [...nums];
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
  return sortArr(res, 0, res.length - 1);
}
