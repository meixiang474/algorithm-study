// leetcode 91

export default function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseInt(s[i - 2] + s[i - 1]) > 26 ? 0 : dp[i - 2]);
  }
  return dp[s.length];
}
