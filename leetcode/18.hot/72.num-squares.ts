// leetcode 279

export default function numSquares(n: number) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  const dp: number[] = [0];
  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    for (let j = 1; j ** 2 <= i; j++) {
      min = Math.min(min, dp[i - (j ** 2)]);
    }
    dp[i] = min + 1;
  }
  return dp[n];
}
