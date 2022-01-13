// leetcode 15

export default function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (current > 0) break;
    if (i > 0 && current === nums[i - 1]) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = current + left + right;
      if (sum === 0) {
        res.push([left, current, right]);
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      } else {
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
      }
    }
  }
  return res;
}
