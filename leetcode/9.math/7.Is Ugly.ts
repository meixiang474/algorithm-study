// leetcode 263

export default function isUgly(n: number) {
  if(n <= 0) return false
  const arr = [2, 3, 5]
  for(let item of arr) {
    while(n % item === 0) {
      n /= item
    }
  }
  return n === 1
}