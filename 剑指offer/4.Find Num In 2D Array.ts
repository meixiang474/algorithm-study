export function findNumberIn2DArray(matrix: number[][], target: number) {
  // 该题从右上角看就是一颗二叉搜索树，用dfs即可解出此题
  if (!matrix || !matrix[0]) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  let r = m - 1;
  let c = 0;
  const dfs = (r: number, c: number): boolean => {
    if (r < 0 || r >= m || c < 0 || c >= n) return false;
    const current = matrix[r][c];
    if (current === target) {
      return true;
    }
    if (current < target) {
      return dfs(r, c + 1);
    } else {
      return dfs(r - 1, c);
    }
  };
  return dfs(r, c);
}
