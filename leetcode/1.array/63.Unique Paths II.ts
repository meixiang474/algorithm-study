export default function uniquePathsWithObstacles(obstacleGrid: number[][]) {
  if (obstacleGrid.length === 0 || obstacleGrid[0].length === 0) return 0;
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    if (obstacleGrid[r][0] === 1) {
      break;
    }
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    if (obstacleGrid[0][c] === 1) {
      break;
    }
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (obstacleGrid[r][c] === 1) continue;
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}
