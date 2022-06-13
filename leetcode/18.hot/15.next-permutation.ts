// leetcode 31

export default function nextPermutation(nums: number[]) {
  let left = -1,
    right = -1;
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      left = i;
      break;
    }
  }
  if (left === -1) {
    nums.reverse();
    return;
  }
  for (let i = nums.length - 1; i > left; i--) {
    if (nums[i] > nums[left]) {
      right = i;
      break;
    }
  }
  swap(nums, left, right);
  const newNums = nums.slice(left + 1).reverse();
  for (let i = left + 1; i < nums.length; i++) {
    nums[i] = newNums[i - left - 1];
  }
}
