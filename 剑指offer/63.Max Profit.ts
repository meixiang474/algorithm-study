/**
 * @description 剑指offer 63
 */

export default function maxProfit(prices: number[]) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    minPrice = Math.min(price, minPrice);
    maxProfit = Math.max(price - minPrice, maxProfit);
  }
  return maxProfit;
}
