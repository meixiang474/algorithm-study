// 46
export function pernute(nums: number[]) {
  const res = [] as number[][];
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach((item) => {
      if (path.includes(item)) {
        return;
      }
      backtrack(path.concat(item));
    });
  };
  backtrack([]);
  return res;
}
