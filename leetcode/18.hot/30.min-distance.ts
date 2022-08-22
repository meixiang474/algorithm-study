// leetcode 72

export default function minDistance(word1: string, word2: string) {
  const m = word1.length;
  const n = word2.length;
  if (m * n === 0) return n + m;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 0; i < m + 1; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i < n + 1; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      const leftAdd = dp[i][j - 1] + 1;
      const rightAdd = dp[i - 1][j] + 1;
      let leftChange = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) leftChange++;
      dp[i][j] = Math.min(leftAdd, rightAdd, leftChange);
    }
  }
  return dp[m][n];
}
