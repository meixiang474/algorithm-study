// leetcode 11

export default function maxArea(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  let res = 0;
  while (l < r) {
    const currentl = nums[l];
    const currentr = nums[r];
    const area = Math.min(currentl, currentr) * (r - l);
    res = Math.max(res, area);
    if (currentl > currentr) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}
