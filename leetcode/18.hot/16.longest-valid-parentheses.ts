// leetcode 32

export default function longestValidParentheses(s: string) {
  if (s.length === 0) return 0;
  const dp: number[] = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    const current = s[i];
    const prev = s[i - 1];
    if (current === ")") {
      if (prev === "(") {
        dp[i] = (dp[i - 2] || 0) + 2;
      } else {
        if (s[i - dp[i - 1] - 1] === "(") {
          dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] || 0);
        }
      }
    }
  }
  return Math.max(...dp);
}
