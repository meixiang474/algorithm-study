export function threeSum(nums: number[]) {
  // 先将数组排序
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    // 如果current > 0则说明current及其后的元素都没有解
    if (current > 0) break;
    // 遇到重复的元素直接跳过
    if (i > 0 && current === nums[i - 1]) continue;
    // 定义双指针
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = current + left + right;
      if (sum === 0) {
        res.push([current, left, right]);
        // 跳过重复元素
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
        // 跳过重复元素
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}
