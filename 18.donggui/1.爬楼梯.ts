// 70
export function climbStairs(n: number): number {
  if (n < 2) return 1;
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
