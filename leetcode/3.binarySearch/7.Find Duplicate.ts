/**
 * @description leetcode 287
 */

export default function findDuplicate(nums: number[]): number {
  let l = 1,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    let cnt = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) cnt++;
    }
    if (cnt <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}
