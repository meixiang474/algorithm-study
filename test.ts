// 16
export function myPow(x: number, n: number) {
  const isNegative = n < 0;
  n = Math.abs(n);
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNegative ? 1 / absPow(x, n) : absPow(x, n);
}

// 17
export function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 1; i <= end; i++) {
    res.push(i);
  }
  return res;
}

// binarysearch
export function binarySearch(arr: number[], target: number) {
  const search = (arr: number[], l: number, r: number): number => {
    if (l > r) {
      return -1;
    }
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      return search(arr, l, mid - 1);
    } else {
      return search(arr, mid + 1, r);
    }
  };
  return search(arr, 0, arr.length - 1);
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
}

// < target得第一个，= target得第一个
export function lowerFloor(arr: number[], target: number) {
  const index = lower(arr, target);
  if (index + 1 < arr.length && arr[index + 1] === target) {
    return index + 1;
  }
  return index;
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
