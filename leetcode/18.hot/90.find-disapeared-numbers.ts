// leetcode 448

export default function findDisapearedNumbers(nums: number[]) {
  for (let item of nums) {
    const index = (item - 1) % nums.length;
    nums[index] += nums.length;
  }
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= nums.length) res.push(i + 1);
  }
  return res;
}
