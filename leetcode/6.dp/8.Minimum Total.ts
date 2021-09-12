// leetcode 120

export default function minimumTotal(triangle: number[][]): number {
  const dp: number[][] = Array.from({ length: triangle.length }, () =>
    new Array(triangle.length).fill(Infinity)
  );
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }
  return Math.min(...dp[dp.length - 1]);
}
