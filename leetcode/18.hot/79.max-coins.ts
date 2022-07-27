// leetcode 312

export default function maxCoins(nums: number[]) {
  const n = nums.length
  const dp: number[][] = Array.from({length: n + 2}, () => new Array(n + 2).fill(0))
  const arr: number[] = new Array(n + 2).fill(0)
  for(let i = 1; i <= n; i++) {
    arr[i] = nums[i - 1]
  }
  arr[0] = arr[n + 1] = 1
  for(let i = n - 1; i >= 0; i--) {
    for(let j = i + 2; j <= n + 1; j++) {
      for(let k = i + 1; k < j; k++) {
        let sum = arr[i] * arr[k] * arr[j]
        sum += dp[i][k] + dp[k][j] 
        dp[i][j] =  Math.max(dp[i][j], sum)
      }
    }
  }
  return dp[0][n + 1]
}
