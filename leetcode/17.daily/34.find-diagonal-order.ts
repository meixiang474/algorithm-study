// leetcode 498

export default function findDiagonalOrder(mat: number[][]) {
  if (mat.length === 0 || mat[0].length === 0) return [];
  const res: number[] = [];
  const m = mat.length;
  const n = mat[0].length;
  for (let i = 0; i < m + n - 1; i++) {
    if (i % 2) {
      let x = i < n ? 0 : i - n + 1;
      let y = i < n ? i : n - 1;
      while (x < m && y >= 0) {
        res.push(mat[x][y]);
        x++;
        y--;
      }
    } else {
      let x = i < m ? i : m - 1;
      let y = i < m ? 0 : i - m + 1;
      while (x >= 0 && y < n) {
        res.push(mat[x][y]);
        y++;
        x--;
      }
    }
  }
  return res;
}
