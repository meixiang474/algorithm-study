// offer 53-I
export function search(nums: number[], target: number) {
  const floor = (nums: number[], target: number) => {
    let l = -1,
      r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor(l + (r - l + 1) / 2);
      if (nums[mid] < target) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const floorIndex = floor(nums, target);
  const ceilIndex = ceil(nums, target);
  return ceilIndex - floorIndex - 1;
}

// leetcode array 40
export function combinationSum2(candidates: number[], target: number) {
  candidates = candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, start: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (start >= candidates.length) {
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      dfs(path.concat(candidates[i]), sum + candidates[i], i + 1);
    }
  };
  dfs([], 0, 0);
  return res;
}

// binary search
export function binarySearch(data: number[], target: number) {
  const searchData = (
    data: number[],
    l: number,
    r: number,
    target: number
  ): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r, target);
    } else {
      return searchData(data, l, mid - 1, target);
    }
  };
  return searchData(data, 0, data.length - 1, target);
}

export function binarySearch1(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
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
export function upper(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(data: number[], target: number) {
  const index = upper(data, target);
  if (index - 1 >= 0 && data[index - 1] === target) {
    return index - 1;
  }
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// < target得第一个
export function lower(data: number[], target: number) {
  let l = -1,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// = target的最后一个，< target的第一个
export function upperFloor(data: number[], target: number) {
  let l = -1,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
}

// < target得第一个，= target得第一个
export function lowerFloor(data: number[], target: number) {
  const index = lower(data, target);
  if (index + 1 < data.length && data[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function sqrt(x: number) {
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
