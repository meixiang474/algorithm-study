// leetcode 357

export default function countNumbers(n: number) {
  const dp = [0, 0];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] * 10 + (9 * 10 ** (i - 2) - dp[i - 1]) * (i - 1);
  }
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += dp[i];
  }
  return 10 ** n - sum;
}
