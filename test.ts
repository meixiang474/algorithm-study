export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 54 55-I
export function kthLargest(root: TreeNode | null, k: number) {
  if (!root) return -Infinity;
  let res = -Infinity;
  let level = 0;
  const dfs = (node: TreeNode) => {
    if (node.right) dfs(node.right);
    level++;
    if (level === k) {
      res = node.val;
      return;
    }
    if (node.left) dfs(node.left);
  };
  return res;
}

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}

// merge sort
// todo
export function mergeSort(nums: number[]) {
  const sortArr = (nums: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(nums, l, mid, temp);
    sortArr(nums, mid + 1, r, temp);
    if (nums[mid] > nums[mid + 1]) {
      merge(nums, l, mid, r, temp);
    }
  };
  const merge = (
    nums: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = nums[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        nums[k] = temp[j];
        j++;
      } else if (j > r) {
        nums[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        nums[k] = temp[i];
        i++;
      } else {
        nums[k] = temp[j];
        j++;
      }
    }
  };
  const res = [...nums];
  sortArr(res, 0, res.length - 1, [...res]);
  return res;
}

export function reversePairs(nums: number[][]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) res++;
    }
  }
  return res;
}

export function reversePairs1(nums: number[]) {
  let res = 0;
  const sortArr = (nums: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(nums, l, mid, temp);
    sortArr(nums, mid + 1, r, temp);
    if (nums[mid] > nums[mid + 1]) {
      merge(nums, l, mid, r, temp);
    }
  };
  const merge = (
    nums: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = nums[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        nums[k] = temp[j];
        j++;
      } else if (j > r) {
        nums[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        nums[k] = temp[i];
        i++;
      } else {
        res += mid - i + 1;
        nums[k] = temp[j];
        j++;
      }
    }
  };
  sortArr([...nums], 0, nums.length, [...nums]);
  return res;
}

export function mergeLists(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return res.next;
}

// hot 37 - 40

// practice array 42 - 56
export function trap(heights: number[]) {
  const left: number[] = [heights[0]];
  for (let i = 1; i < heights.length; i++) {
    left[i] = Math.max(left[i - 1], heights[i]);
  }
  const right: number[] = [];
  right[heights.length - 1] = heights[heights.length - 1];
  for (let i = heights.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], heights[i]);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res += Math.min(left[i], right[i]) - heights[i];
  }
  return res;
}

export function rotate(matrix: number[][]) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
}

export function maxSubArray(nums: number[]) {
  const dp: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max(...dp);
}

export function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const res: number[] = [];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let dIndex = 0,
    r = 0,
    c = 0;
  const total = m * n;
  for (let i = 0; i < total; i++) {
    res[i] = matrix[r][c];
    visited[r][c] = true;
    const nextR = r + directions[dIndex][0];
    const nextC = c + directions[dIndex][1];
    if (
      !(
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !visited[nextR][nextC]
      )
    ) {
      dIndex = (dIndex + 1) % 4;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
}

export function merge(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}
