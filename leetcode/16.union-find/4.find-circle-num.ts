// leetcode 547

export default function findCircleNum(isConnected: number[][]) {
  const m = isConnected.length;
  if (m === 0) return 0;
  const visited = new Set();
  const dfs = (r: number) => {
    for (let c = 0; c < m; c++) {
      if (isConnected[r][c] === 1 && !visited.has(c)) {
        visited.add(c);
        dfs(c);
      }
    }
  };
  let res = 0;
  for (let r = 0; r < m; r++) {
    if (!visited.has(r)) {
      res++;
      dfs(r);
    }
  }
  return res;
}
