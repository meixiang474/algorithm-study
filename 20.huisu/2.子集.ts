// 78
export function subsets(nums: number[]) {
  const res = [] as number[][];
  const backtrack = (path: number[], end: number, start: number) => {
    if (path.length === end) {
      res.push(path);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), end, i + 1);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0);
  }
  return res;
}
