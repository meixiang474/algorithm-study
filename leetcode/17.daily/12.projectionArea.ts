// leetcode 883

export default function projectionArea(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const n = grid.length;
  const rowMax = new Array(n).fill(0);
  const colMax = new Array(n).fill(0);
  let topArea = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const current = grid[r][c];
      if (current !== 0) topArea++;
      rowMax[r] = Math.max(rowMax[r], current);
      colMax[c] = Math.max(colMax[c], current);
    }
  }
  return (
    topArea + rowMax.reduce((a, b) => a + b) + colMax.reduce((a, b) => a + b)
  );
}
