export default function minPathSum(grid: number[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(Infinity)
  );
  dp[0][0] = grid[0][0];
  for (let r = 1; r < m; r++) {
    dp[r][0] = grid[r][0] + dp[r - 1][0];
  }
  for (let c = 1; c < n; c++) {
    dp[0][c] = grid[0][c] + dp[0][c - 1];
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = grid[r][c] + Math.min(dp[r - 1][c], dp[r][c - 1]);
    }
  }
  return dp[m - 1][n - 1];
}
