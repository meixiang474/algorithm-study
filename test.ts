// offer 47
export function maxValue(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 && c === 0) {
        dp[r][c] = grid[r][c];
      } else if (r === 0) {
        dp[r][c] = dp[r][c - 1] + grid[r][c];
      } else if (c === 0) {
        dp[r][c] = dp[r - 1][c] + grid[r][c];
      } else {
        dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
      }
    }
  }
  return dp[m - 1][n - 1];
}

// leetcode array 11
export function threeSum(nums: number[]) {
  nums = nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current > 0) break;
    if (i > 0 && current === nums[i - 1]) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentL = nums[l];
      const currentR = nums[r];
      const sum = currentL + currentR + current;
      if (sum === 0) {
        res.push([l, i, r]);
        while (l < r) {
          l++;
          if (nums[l] !== currentL) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== currentR) break;
        }
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}

// fenzhi donggui
export function findContentChildren(s: number[], g: number[]) {
  s = s.sort((a, b) => a - b);
  g = g.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) {
      res++;
    }
  });
  return res;
}

export function maxProfit(profits: number[]) {
  let profit = 0;
  for (let i = 0; i < profits.length - 1; i++) {
    if (profits[i] < profits[i + 1]) {
      profit += profits[i + 1] - profits[i];
    }
  }
  return profit;
}

export function permute(nums: number[]) {
  const res: number[][] = [];
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach((item) => {
      if (!path.includes(item)) {
        backtrack(path.concat(item));
      }
    });
  };
  backtrack([]);
  return res;
}

export function subset(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], len: number, index: number) => {
    if (len === path.length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < len) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), len, i + 1);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], i, 0);
  }
  return res;
}
