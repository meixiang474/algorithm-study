// leetcode 240

export default function searchMatrix(matrix: number[][], target: number) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number): boolean => {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target) {
      return c - 1 >= 0 && dfs(r, c - 1);
    } else {
      return r + 1 < m && dfs(r + 1, c);
    }
  };
  return dfs(0, n - 1);
}
