// leetcode 121

export default function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i];
    }
  }
  return profit;
}
