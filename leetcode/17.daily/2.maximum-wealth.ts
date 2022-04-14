// leetcode 1672

export default function maximumWealth(accounts: number[][]): number {
  return accounts.reduce((memo, current) => {
      return Math.max(memo, current.reduce((a, b) => a + b))
  }, 0)
};