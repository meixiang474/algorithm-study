// leetcode 60

export default function getPermutation(n: number, k: number) {
  let groupNum = 1
  for(let i = 1; i <= n; i++) {
    groupNum *= i
  }
  const bc = (path: number[]): string => {
    if(path.length === n) {
      return path.join('')
    }
    groupNum = groupNum / (n - path.length)
    for(let i = 1; i <= n; i++) {
      if(path.includes(i)) continue
      if(k > groupNum) {
        k -= groupNum
        continue
      }
      return bc(path.concat(i))
    }
    return ''
  }
  return bc([])
}
