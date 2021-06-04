/**
 * @description 剑指offer 53
 */

export default function search(nums: number[], target: number): number {
  const floor = (nums: number[], target: number) => {
    let l = -1,
      r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor(l + (r - l + 1) / 2);
      if (nums[mid] < target) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const left = floor(nums, target);
  const right = ceil(nums, target);
  if (nums[left + 1] === target) {
    return right - left - 1;
  } else {
    return 0;
  }
}
