// leetcode 494

export default function findTargetSumWays(nums: number[], target: number) {
  if(nums.length === 0) return 0
  const sum = nums.reduce((a, b) => a + b, 0)
  const diff = sum - target
  if(diff < 0 || diff % 2 !== 0) return 0
  const n = nums.length, neg = diff / 2
  const dp: number[][] = Array.from({length: n + 1}, () => new Array(neg + 1).fill(0))
  dp[0][0] = 1
  for(let i = 1; i <= n; i++) {
    const current = nums[i - 1]
    for(let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j]
      if(j >= current) {
        dp[i][j] += dp[i - 1][j - current]
      }
    }
  }
  return dp[n][neg]
}