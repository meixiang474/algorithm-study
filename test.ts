// offer 10-II
export function numWays(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// binary search
export function binarySearch(data: number[], target: number) {
  const searchData = (data: number[], l: number, r: number): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r);
    } else {
      return searchData(data, l, mid - 1);
    }
  };
  return searchData(data, 0, data.length - 1);
}

export function binarySearch1(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
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
    r = data.length - 1;
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
    r = data.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// < target得第一个，= target得第一个
export function lowerFloor(data: number[], target: number) {
  const index = lower(data, target);
  if (index + 1 < data.length && data[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function mySqrt1(n: number) {
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

// bfs 1 - 5

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.left)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
}
