// leetcode 238

export default function productExceptionSelf(nums: number[]) {
  const res: number[] = [];
  res[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    res[i] = nums[i - 1] * res[i - 1];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] = res[i] * right;
    right *= nums[i];
  }
  return res;
}
