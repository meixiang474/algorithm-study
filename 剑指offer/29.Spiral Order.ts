export default function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const res = [];
  const m = matrix.length;
  const n = matrix[0].length;
  const map = Array.from({ length: m }, () => new Array(n));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let dIndex = 0,
    r = 0,
    c = 0;
  for (let i = 0; i < m * n; i++) {
    res[i] = matrix[r][c];
    map[r][c] = true;
    const nextR = r + directions[dIndex][0];
    const nextC = c + directions[dIndex][1];
    if (!(nextR >= 0 && nextR < m && nextC >= 0 && nextC < n && !map[r][c])) {
      dIndex = (dIndex + 1) % directions.length;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
}
