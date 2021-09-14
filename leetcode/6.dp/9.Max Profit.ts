// leetcode 121

export default function maxProfit(prices: number[]): number {
  const dp = [0];
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    const profit = current - min;
    dp[i] = Math.max(dp[i - 1], profit);
    min = Math.min(min, current);
  }
  return dp[prices.length - 1];
}
