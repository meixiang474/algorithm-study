// leetcode 53

export default function maxSubarray(nums: number[]) {
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = dp[i - 1] >= 0 ? dp[i - 1] + nums[i] : nums[i];
  }
  return Math.max(...dp);
}
