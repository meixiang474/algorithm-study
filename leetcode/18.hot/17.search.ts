// leetcode 33

export default function search(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] >= nums[l]) {
      if (target === nums[l]) return l;
      if (target > nums[l] && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (target === nums[r]) return r;
      if (target < nums[r] && target > nums[mid]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}
