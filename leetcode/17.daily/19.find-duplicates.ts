// 442

export default function findDuplicates(nums: number[]): number[] {
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== nums[nums[i] - 1]) {
      swap(nums, i, nums[i] - 1);
    }
  }
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current - 1 !== i) res.push(current);
  }
  return res;
}
