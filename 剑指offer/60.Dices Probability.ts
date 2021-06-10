/**
 * @description 剑指offer 60
 */

export default function dicesProbability(n: number) {
  if (n === 0) return [];
  let dp = new Array(6).fill(1 / 6);
  for (let i = 2; i <= n; i++) {
    const temp: number[] = [];
    for (let j = 1; j <= 6; j++) {
      for (let k = 0; k < dp.length; k++) {
        const sum = k + j - 1;
        temp[sum] = (temp[sum] || 0) + (1 / 6) * dp[k];
      }
    }
    dp = temp;
  }
  return dp;
}
