/**
 * @description 剑指offer 42
 */

export default function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return -Infinity;
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    if (dp[i - 1] > 0) {
      dp[i] = dp[i - 1] + nums[i];
    } else {
      dp[i] = nums[i];
    }
  }
  return Math.max(...dp);
}
