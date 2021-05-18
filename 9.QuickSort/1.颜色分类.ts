// 75
function sortColors(nums: (0 | 1 | 2)[]) {
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let left = -1,
    i = 0,
    right = nums.length;
  while (i < right) {
    if (nums[i] === 0) {
      left++;
      swap(nums, i, left);
      i++;
    } else if (nums[i] === 2) {
      right--;
      swap(nums, right, i);
    } else {
      i++;
    }
  }
  return nums;
}
