/**
 * @description leetcode 90
 */

export default function subsetsWithDup(nums: number[]): number[][] {
  if (nums.length === 0) return [];
  const res: number[][] = [];
  const map = new Map<number, boolean>();
  const backtrack = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      if (i > 0 && !map.get(i - 1) && nums[i - 1] === nums[i]) continue;
      map.set(i, true);
      backtrack(path.concat(nums[i]), i + 1, length);
      map.set(i, false);
    }
  };
  nums.sort((a, b) => a - b);
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], 0, i);
  }
  return res;
}
