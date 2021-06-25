export default function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const total = m * n;
  const res = [];
  let dIndex = 0,
    r = 0,
    c = 0;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (let i = 0; i < total; i++) {
    res[i] = matrix[r][c];
    visited[r][c] = true;
    const nextR = r + directions[dIndex][0];
    const nextC = c + directions[dIndex][1];
    if (
      !(
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !visited[nextR][nextC]
      )
    ) {
      dIndex = (dIndex + 1) % 4;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
}
