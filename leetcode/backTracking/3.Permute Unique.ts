/**
 * @description leecode 47
 */

export default function permuteUnique(nums: number[]): number[][] {
  if (nums.length === 0) return [];
  const res: number[][] = [];
  const map = new Map<number, boolean>();
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && map.get(i - 1)) continue;
      if (!map.get(i)) {
        map.set(i, true);
        backtrack(path.concat(nums[i]));
        map.set(i, false);
      }
    }
  };
  nums.sort((a, b) => a - b);
  backtrack([]);
  return res;
}
