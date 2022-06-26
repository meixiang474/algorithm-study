// leetcode 85

export default function maximalRectangle(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const left = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "1") {
        left[r][c] = (c > 0 ? left[r][c - 1] : 0) + 1;
      }
    }
  }
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "0") continue;
      let width = left[r][c];
      let area = width;
      for (let i = r - 1; i >= 0; i--) {
        if (left[i][c] === 0) break;
        width = Math.min(width, left[i][c]);
        area = Math.max(area, width * (r - i + 1));
      }
      res = Math.max(res, area);
    }
  }
  return res;
}
