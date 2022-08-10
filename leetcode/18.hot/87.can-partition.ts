// leetcode 416

export default function canPartition(nums: number[]) {
  const n = nums.length
  if(n < 2) return false
  let sum = 0, max = 0
  for(let item of nums) {
    sum += item
    max = Math.max(max, item)
  }
  if(sum % 2 !== 0) return false
  const target = sum / 2
  if(max > target) return false
  const dp: boolean[][] = Array.from({length: n}, () => new Array(target + 1).fill(false))
  for(let i = 0; i < n; i++) {
    dp[i][0] = true
  }
  dp[0][nums[0]] = true
  for(let i = 1; i < n; i++) {
    const current = nums[i]
    for(let j = 1; j <= target; j++) {
      if(j >= current) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - current]
      }else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n - 1][target]
}