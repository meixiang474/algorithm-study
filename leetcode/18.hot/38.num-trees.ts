// leetcode 96

export default function numTrees(n: number) {
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
