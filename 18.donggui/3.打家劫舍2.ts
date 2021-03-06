// 213
export function rob(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const findMax = (nums: number[]) => {
    if (nums.length === 0) return 0;
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(findMax(nums.slice(1)), findMax(nums.slice(0, -1)));
}
