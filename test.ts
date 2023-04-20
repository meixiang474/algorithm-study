import { Heap } from "./practice/week5/1.heap";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 28 29
export function symmetricTree(root: TreeNode | null) {
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

export function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const map = Array.from({ length: m }, () => new Array(n).fill(false));
  const res: number[] = [];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let r = 0;
  let c = 0;
  let dIndex = 0;
  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    const newR = r + directions[dIndex][0];
    const newC = c + directions[dIndex][1];
    if (!(newR >= 0 && newR < m && newC >= 0 && newC < n && !map[newR][newC])) {
      dIndex = (dIndex + 1) % directions.length;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
}

// set map
// todo

// hot 13 - 16
export const generateParenthesis = (n: number) => {
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length >= 2 * n) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close + 1);
    }
  };
  dfs("", 0, 0);
  return res;
};

export const mergeKLists = (lists: (ListNode | null)[]) => {
  const merge = (
    lists: (ListNode | null)[],
    l: number,
    r: number
  ): ListNode | null => {
    if (l === r) return lists[l];
    if (l > r) return null;
    const mid = Math.floor(l + (r - l) / 2);
    return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r));
  };
  const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null) => {
    const res = new ListNode(-1);
    let p1 = l1,
      p2 = l2,
      p3 = res;
    while (p1 && p2) {
      if (p1.val < p2.val) {
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
  };
  return merge(lists, 0, lists.length - 1);
};

export const nextPermutation = (nums: number[]) => {
  let left = -1;
  let right = -1;
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      left = i;
      break;
    }
  }
  if (left === -1) {
    nums.reverse();
    return;
  }
  for (let i = nums.length - 1; i >= left; i--) {
    if (nums[i] > nums[left]) {
      right = i;
      break;
    }
  }
  swap(nums, left, right);
  const newNums = nums.slice(left + 1).reverse();
  for (let i = left + 1; i < nums.length; i++) {
    nums[i] = newNums[i - left - 1];
  }
};

export const longestValidParentheses = (s: string) => {
  if (s.length === 0) return 0;
  const dp = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    const current = s[i];
    const prev = s[i - 1];
    if (current === ")") {
      if (prev === "(") {
        dp[i] = (dp[i - 2] || 0) + 2;
      } else {
        if (s[i - dp[i - 1] - 1] === "(") {
          dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] || 0);
        }
      }
    }
  }
  return Math.max(...dp);
};

// dp 1-5
export function maxSubArr(nums: number[]) {
  const dp: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max(...dp);
}

export function uniquePaths(m: number, n: number) {
  if (m === 0 || n === 0) return 0;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}

export function uniquePathsTwo(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    if (grid[r][0] === 1) break;
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    if (grid[0][c] === 1) break;
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (grid[r][c] === 1) continue;
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}

export function minPathSum(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = grid[0][0];
  for (let r = 1; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0];
  }
  for (let c = 1; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c];
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[m - 1][n - 1];
}

export function climeStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}
