/**
 * @description 剑指offer 46
 */

export default function translateNum(num: number): number {
  const numStr = num.toString();
  const dp = [1, 1];
  for (let i = 2; i <= numStr.length; i++) {
    if (
      parseInt(numStr.slice(i - 2, i)) > 25 ||
      parseInt(numStr.slice(i - 2, i)) < 10
    ) {
      dp[i] = dp[i - 1];
    } else {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
  }
  return dp[numStr.length];
}
