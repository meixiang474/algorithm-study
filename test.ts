// offer 60

export function dicesProbability(n: number) {
  if (n === 0) return [];
  let dp = new Array(6).fill(1 / 6);
  for (let i = 2; i <= n; i++) {
    const temp: number[] = [];
    for (let j = 1; j <= 6; j++) {
      for (let k = 0; k < dp.length; k++) {
        const sum = k + j - 1;
        temp[sum] = (temp[sum] || 0) + dp[k] * (1 / 6);
      }
      dp = temp;
    }
  }
  return dp;
}

// binary search

export function binarySearch(arr: number[], target: number) {
  const searchData = (
    arr: number[],
    l: number,
    r: number,
    target: number
  ): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      return searchData(arr, l, mid - 1, target);
    } else {
      return searchData(arr, mid + 1, r, target);
    }
  };
  return searchData(arr, 0, arr.length - 1, target);
}

export function binarySearch1(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// > target的第一个
export function upper(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(arr: number[], target: number) {
  const index = upper(arr, target);
  if (index - 1 >= 0 && arr[index - 1] === target) {
    return index - 1;
  }
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// < target得第一个
export function lower(arr: number[], target: number) {
  let l = -1,
    r = arr.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (arr[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// = target的最后一个，< target的第一个
export function upperFloor(arr: number[], target: number) {
  let l = -1,
    r = arr.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (arr[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// < target得第一个，= target得第一个
export function lowerFloor(arr: number[], target: number) {
  const index = lower(arr, target);
  if (index + 1 < arr.length && arr[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function fn(x: number) {
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
