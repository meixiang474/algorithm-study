// leetcode 424

export default function charactorReplacement(s: string, k: number) {
  const arr = new Array(26).fill(0)
  // max为滑动窗口所有划过范围内所出现的最大频次
  let max = 0, l = 0, r = 0
  while(r < s.length) {
    const current = s[r]
    arr[current.charCodeAt(0) - 'A'.charCodeAt(0)]++
    max = Math.max(max, arr[current.charCodeAt(0) - 'A'.charCodeAt(0)])
    if(r - l + 1 - max > k) {
      arr[s[l].charCodeAt(0) - 'A'.charCodeAt(0)]--
      l++
    }
    r++
  }
  return r - l
}
