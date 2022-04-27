// leetcode 417

export default function percificAtlantic(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return [];
  const m = grid.length;
  const n = grid[0].length;
  const flow1: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const flow2: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const res: number[][] = [];
  const dfs = (r: number, c: number, flow: boolean[][]) => {
    flow[r][c] = true;
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        grid[r][c] <= grid[nextR][nextC] &&
        !flow[nextR][nextC]
      ) {
        dfs(nextR, nextC, flow);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    dfs(r, 0, flow1);
    dfs(r, n - 1, flow2);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
}
