export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
  }
  return dp[nums.length];
}

export function rob1(nums: number[]) {
  const _rob = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(_rob(nums.slice(1)), _rob(nums.slice(0, -1)));
}

export function fn(g: number[], s: number[]) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) {
      res++;
    }
  });
  return res;
}

export function fn1(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (i > 0 && prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}

export function permute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!path.includes(nums[i])) {
        dfs(path.concat(nums[i]));
      }
    }
  };
  dfs([]);
  return res;
}

export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], len: number, index: number) => {
    if (path.length === len) {
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
