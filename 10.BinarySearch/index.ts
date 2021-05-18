function binarySearch(data: number[], target: number) {
  function searchData(
    data: number[],
    l: number,
    r: number,
    target: number
  ): number {
    if (l > r) {
      return -1;
    }
    let mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r, target);
    } else {
      return searchData(data, l, mid - 1, target);
    }
  }
  return searchData(data, 0, data.length - 1, target);
}

// 非递归
function binarySearch1(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    let mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return -1;
}

// > target的第一个
function upper(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    let mid = Math.floor(l + (r - l) / 2);
    if (data[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
function ceil(data: number[], target: number) {
  let res = upper(data, target);
  if (res - 1 >= 0 && data[res - 1] === target) {
    return res - 1;
  }
  return res;
}

// = target第一个或者 > target第一个
function lowerCeil(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    let mid = Math.floor(l + (r - l) / 2);
    if (data[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// < target得第一个
function lower(data: number[], target: number) {
  let l = -1,
    r = data.length - 1;
  while (l < r) {
    let mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] >= target) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }
  return l;
}

// = target的最后一个，< target的第一个
function upperFloor(data: number[], target: number) {
  let l = -1,
    r = data.length - 1;
  while (l < r) {
    let mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] > target) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }
}

// < target得第一个，= target得第一个
function lowerFloor(data: number[], target: number) {
  let res = lower(data, target);
  if (res + 1 < data.length && data[res + 1] === target) {
    return res + 1;
  }
  return res;
}
