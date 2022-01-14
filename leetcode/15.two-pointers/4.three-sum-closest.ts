// leetcode 16

export default function threeSumClosest(nums: number[], target: number) {
  let res = 0;
  let diff = Infinity;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    let isEqual = false;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = left + current + right;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        diff = newDiff;
        res = sum;
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum > target) {
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
    if (isEqual) break;
  }
  return res;
}
