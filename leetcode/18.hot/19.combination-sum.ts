// leetcode 39

export default function combinationSum(candidates: number[], target: number) {
  if (candidates.length === 0) return [];
  const res: number[][] = [];
  const dfs = (path: number[], index: number, sum: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= candidates.length || sum > target) return;
    dfs(path.concat(candidates[index]), index, sum + candidates[index]);
    dfs(path, index + 1, sum);
  };
  dfs([], 0, 0);
  return res;
}
