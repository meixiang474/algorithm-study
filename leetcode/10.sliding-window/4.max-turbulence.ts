// leetcode 978

export default function maxTurbulence(nums: number[]) {
  let res = 1;
  let l = 0,
    r = 0;
  while (r < nums.length - 1) {
    const right = nums[r];
    const left = nums[l];
    if (l === r) {
      if (left === nums[l + 1]) {
        l++;
      }
      r++;
    } else {
      if (
        (right > nums[r - 1] && right > nums[r + 1]) ||
        (right < nums[r - 1] && right < nums[r + 1])
      ) {
        r++;
      } else {
        l = r;
      }
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
}
