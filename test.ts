// offer 31
export default function validateStackSequence(
  pushed: number[],
  popped: number[]
) {
  let stack: number[] = [];
  for (let item of pushed) {
    stack.push(item);
    while (stack.length && stack[stack.length - 1] === popped[0]) {
      popped.shift();
      stack.pop();
    }
  }
  return stack.length === 0;
}

// binary search
export function binarySearch(data: number[], target: number) {
  const searchData = (data: number[], l: number, r: number): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] > target) {
      return searchData(data, l, mid - 1);
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r);
    } else {
      return mid;
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
    if (data[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// leetcode dp 6-10
export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseInt(s[i - 2] + s[i - 1]) > 26 ? 0 : dp[i - 2]);
  }
  return dp[s.length];
}

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function minimumTotal(triangle: number[][]) {
  const dp: number[][] = Array.from({ length: triangle.length }, () =>
    new Array(triangle.length).fill(Infinity)
  );
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
    }
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }
  return Math.min(...dp[triangle.length - 1]);
}

export function maxProfit(prices: number[]) {
  const dp = [0];
  let min = prices[0];
  for (let i = 1; i <= prices.length; i++) {
    const current = prices[i - 1];
    const profit = current - min;
    dp[i] = Math.max(dp[i - 1], profit);
    min = Math.min(min, current);
  }
  return dp[prices.length];
}

export function maxProduct(nums: number[]) {
  const dpMax = [nums[0]];
  const dpMin = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dpMax[i] = Math.max(
      dpMax[i - 1] * nums[i],
      dpMin[i - 1] * nums[i],
      nums[i]
    );
    dpMin[i] = Math.min(
      dpMin[i - 1] * nums[i],
      dpMax[i - 1] * nums[i],
      nums[i]
    );
  }
  return Math.max(...dpMax);
}
