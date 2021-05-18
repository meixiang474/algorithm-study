export default function movingCount(m: number, n: number, k: number) {
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
    map[r][c] = true;
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (nextR >= 0 && nextR < m && nextC >= 0 && nextC < n) {
        const sum =
          nextR
            .toString()
            .split("")
            .map((i) => parseFloat(i))
            .reduce((a, b) => a + b) +
          nextC
            .toString()
            .split("")
            .map((i) => parseFloat(i))
            .reduce((a, b) => a + b);
        if (sum <= k && !map[nextR][nextC]) {
          dfs(nextR, nextC);
        }
      }
    });
  };
  dfs(0, 0);
  return res;
}
