// leetcode 231

export default function powerOfTwo(n: number): boolean {
  if(n === 0) return false
  if(n === 1) return true
  if(n % 2 !== 0) return false
  return powerOfTwo(n / 2 )
}