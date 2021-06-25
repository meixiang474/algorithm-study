/**
 * @description leetcode 78
 */

export default function subsets(nums: number[]) {
  if (nums.length === 0) return [];
  const res: number[][] = [];
  const backtrack = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], 0, i);
  }
  return res;
}
