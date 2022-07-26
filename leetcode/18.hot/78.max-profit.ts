// leetcode 309

export default function maxProfit(prices: number[]) {
  let f0 = -prices[0]
  let f1 = 0
  let f2 = 0
  for(let item of prices) {
    const newf0 = Math.max(f0, f2 - item)
    const newf1 = f0 + item
    const newf2 = Math.max(f1, f2)
    f0 = newf0
    f1 = newf1
    f2 = newf2
  }
  return Math.max(f1, f2)
}