export default function combineSum2(candidates: number[], target: number) {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, start: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) return;
    if (start >= candidates.length) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      backtrack([...path, candidates[i]], sum + candidates[i], i + 1);
    }
  };
  backtrack([], 0, 0);
  return res;
}
