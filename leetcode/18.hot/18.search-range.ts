// leetcode 34

export default function searchRange(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  let res = [-1, -1];
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid - 1] === target) {
        r = mid - 1;
      } else {
        res[0] = mid;
        break;
      }
    }
  }
  (l = 0), (r = nums.length - 1);
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid + 1] === target) {
        l = mid + 1;
      } else {
        res[1] = mid;
        break;
      }
    }
  }
  return res;
}
