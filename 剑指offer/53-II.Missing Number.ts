/**
 * @description 剑指offer 53-II
 */

export default function missingNumber(nums: number[]) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}
