// leetcode 5

export default function longestPalindrome(s: string): string {
  if (s.length === 1) return s;
  const dp: boolean[][] = Array.from({ length: s.length }, () =>
    new Array(s.length).fill(false)
  );
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }
  let maxLength = 1;
  let startIndex = 0;
  for (let l = 2; l <= s.length; l++) {
    for (let left = 0; left < s.length; left++) {
      const right = left + l - 1;
      if (right >= s.length) break;
      if (s[left] !== s[right]) {
        dp[left][right] = false;
      } else {
        if (right - left + 1 <= 3) {
          dp[left][right] = true;
        } else {
          dp[left][right] = dp[left + 1][right - 1];
        }
      }
      if (dp[left][right]) {
        maxLength = l;
        startIndex = left;
      }
    }
  }
  return s.slice(startIndex, startIndex + maxLength);
}
