// leetcode 926

export default function minFlipsMonoIncr(s: string): number {
  const dp = s[0] === "0" ? [[0, 1]] : [[1, 0]];
  for (let i = 1; i < s.length; i++) {
    const prev = dp[i - 1];
    const current = s[i];
    if (current === "1") {
      dp[i] = [prev[0] + 1, Math.min(prev[0], prev[1])];
    } else {
      dp[i] = [prev[0], Math.min(prev[0], prev[1]) + 1];
    }
  }
  return Math.min(...dp[dp.length - 1]);
}
