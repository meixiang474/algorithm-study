// leetcode 473

function makesquare(matchsticks: number[]): boolean {
  const sum = matchsticks.reduce((memo, current) => memo + current, 0);
  if (sum % 4 !== 0) return false;
  matchsticks.sort((a, b) => b - a);
  const edges: number[] = new Array(4).fill(0);
  const dfs = (
    index: number,
    matchsticks: number[],
    len: number,
    edges: number[]
  ) => {
    if (index >= matchsticks.length) return true;
    for (let i = 0; i < edges.length; i++) {
      edges[i] += matchsticks[index];
      if (edges[i] <= len && dfs(index + 1, matchsticks, len, edges)) {
        return true;
      }
      edges[i] -= matchsticks[index];
    }
    return false;
  };
  return dfs(0, matchsticks, Math.floor(sum / 4), edges);
}
