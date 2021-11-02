// leetcode 567

export default function checkInclusion(s1: string, s2: string) {
  if(s1.length > s2.length) return false
  const arr1 = new Array(26).fill(0)
  const arr2 = new Array(26).fill(0)
  for(let i = 0; i < s1.length; i++) {
    arr1[s1[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    arr2[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
  }
  if(arr1.toString() === arr2.toString()) return true
  for(let i = s1.length; i < s2.length; i++) {
    arr2[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    arr2[s2[i - s1.length].charCodeAt(0) - 'a'.charCodeAt(0)]--
    if(arr1.toString() === arr2.toString()) return true
  }
  return false
}