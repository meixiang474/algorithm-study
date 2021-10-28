// leetcode 343

export default function integerBreak(n: number) {
  const arr = [1, 2, 4, 6, 9]
  if(n <= 6) {
    return arr[n - 2]
  }
  let res = 1
  while(n > 6) {
    res *= 3
    n -= 3
  }
  return res * arr[n - 2]
}