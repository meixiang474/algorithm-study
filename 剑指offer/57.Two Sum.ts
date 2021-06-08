/**
 * @description 剑指offer 57
 */

export default function twoSum(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) {
      return [nums[l], nums[r]];
    } else if (sum < target) {
      l++;
    } else {
      r--;
    }
  }
  return [];
}
