// leetcode 438

export default function findAnagrams(s: string, p: string) {
  if(s.length < p.length) return []
  const res: number[] = []
  const sMap: number[] = new Array(26).fill(0)
  const pMap: number[] = new Array(26).fill(0)
  for(let i = 0; i < p.length; i++) {
    sMap[p[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    pMap[p[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
  }
  if(sMap.toString() === pMap.toString()) {
    res.push(0)
  }
  for(let i = 0; i < s.length - p.length; i++) {
    sMap[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]--
    sMap[s[i + p.length].charCodeAt(0) - 'a'.charCodeAt(0)]++
    if(sMap.toString() === pMap.toString()) res.push(i + 1)
  }
  return res
}