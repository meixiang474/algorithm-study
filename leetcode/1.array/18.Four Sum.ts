export default function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      if (current + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (
        current + nums[j] + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const sum = current + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([current, nums[j], nums[l], nums[r]]);
          while (l < r) {
            l++;
            if (nums[l] !== nums[l - 1]) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== nums[r + 1]) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== nums[l - 1]) break;
          }
        } else {
          while (l < r) {
            r--;
            if (nums[r] !== nums[r + 1]) break;
          }
        }
      }
    }
  }
  return res;
}
