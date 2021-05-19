export function generateMatrix(n: number) {
  const map: boolean[][] = Array.from({ length: n }, () =>
    new Array(n).fill(false)
  );
  const res: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let dIndex = 0,
    r = 0,
    c = 0;
  for (let i = 1; i <= n ** 2; i++) {
    res[r][c] = i;
    map[r][c] = true;
    let nextR = r + directions[dIndex][0];
    let nextC = c + directions[dIndex][1];
    if (
      !(
        nextR >= 0 &&
        nextR < n &&
        nextC >= 0 &&
        nextC < n &&
        !map[nextR][nextC]
      )
    ) {
      dIndex = (dIndex + 1) % directions.length;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
}
