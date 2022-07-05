// leetcode 139

export default function wordBreak(s: string, wordDict: string[]) {
  const dp = [true]
  const set = new Set(wordDict)
  for(let i = 1; i <= s.length; i++) {
    dp[i] = false
    for(let j = 0; j < i; j++) {
      if(dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[s.length]
}