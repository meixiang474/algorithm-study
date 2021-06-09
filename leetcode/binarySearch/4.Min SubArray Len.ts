/**
 * @description leetcode 209
 */

export default function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0,
    r = 0;
  let res = 0;
  let sum = 0;
  while (r < nums.length) {
    sum += nums[r];
    while (sum >= target) {
      if (res === 0 || res > r - l + 1) {
        res = r - l + 1;
      }
      sum -= nums[l];
      l++;
    }
    r++;
  }
  return res;
}
