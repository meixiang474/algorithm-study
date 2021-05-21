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
  if (index - 1 >= 0 && arr[index] === target) {
    return index - 1;
  }
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(arr: number[], target: number) {
  let l = 0,
    r = arr.length - 1;
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

export function fn(n: number) {
  let l = 0,
    r = n;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= n) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}
