// leetcode 221

export default function maximalSquare(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === '0') continue;
      if (r === 0 || c === 0) {
        dp[r][c] = 1;
      } else {
        dp[r][c] = Math.min(dp[r - 1][c - 1], dp[r - 1][c], dp[r][c - 1]) + 1;
      }
      res = Math.max(res, dp[r][c]);
    }
  }
  return res ** 2;
}
