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

// hot 33-36
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function exist(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    const temp = board[r][c];
    board[r][c] = "";
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    board[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 1);
        if (res) return res;
      }
    }
  }
  return false;
}

export function largestRectangleArea(heights: number[]) {
  const stack: number[] = [];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }
  stack.length = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[0]] >= heights[i]) {
      stack.shift();
    }
    right[i] = stack.length > 0 ? stack[0] : heights.length;
    stack.unshift(i);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res = Math.max(res, (right[i] - left[i] - 1) * heights[i]);
  }
  return res;
}

export function maximalRectangle(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const left: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(0)
  );
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "1") {
        left[r][c] = (c > 0 ? left[r][c - 1] : 0) + 1;
      }
    }
  }
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "0") continue;
      let width = left[r][c];
      let area = width;
      for (let i = r - 1; i >= 0; i--) {
        width = Math.min(width, left[r - 1][c]);
        area = Math.max(area, width * (r - i + 1));
      }
      res = Math.max(res, area);
    }
  }
  return res;
}

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
