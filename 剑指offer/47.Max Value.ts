/**
 * @description 剑指offer 47
 */

export default function maxValue(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
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
