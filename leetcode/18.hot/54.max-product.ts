// leetcode 152

export default function maxProduct(nums: number[]) {
  const dpMax = [nums[0]];
  const dpMin = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dpMax[i] = Math.max(
      nums[i] * dpMax[i - 1],
      nums[i] * dpMin[i - 1],
      nums[i]
    );
    dpMin[i] = Math.min(
      nums[i] * dpMin[i - 1],
      nums[i] * dpMax[i - 1],
      nums[i]
    );
  }
  return Math.max(...dpMax);
}
