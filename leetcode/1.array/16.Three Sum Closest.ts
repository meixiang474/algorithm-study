export function threeSumClosest(nums: number[], target: number) {
  let res = 0;
  // 排序
  nums.sort((a, b) => a - b);
  let diff = Number.MAX_VALUE;
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    // 跳过重复的元素
    if (i > 0 && current === nums[i - 1]) continue;
    let isEqual = false;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = current + left + right;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        // 如果diff更小，就刷新res
        diff = newDiff;
        res = sum;
        if (sum > target) {
          // 跳过重复元素
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum < target) {
          // 跳过重复元素
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
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        }
      }
    }
    // 如果相等直接返回
    if (isEqual) break;
  }
  return res;
}
