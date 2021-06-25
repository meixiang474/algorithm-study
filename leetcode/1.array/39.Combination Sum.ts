export default function combinationSum(candidates: number[], target: number) {
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= candidates.length) return;
    if (sum > target) return;
    backtrack(path, sum, index + 1);
    backtrack([...path, candidates[index]], sum + candidates[index], index + 1);
  };
  backtrack([], 0, 0);
  return res;
}
