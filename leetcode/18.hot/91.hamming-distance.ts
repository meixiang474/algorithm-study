// leetcode 461

export default function hammingDistance(x: number, y: number) {
  let xchar = x.toString(2)
  let ychar = y.toString(2)
  const maxLength = Math.max(xchar.length, ychar.length)
  xchar = xchar.padStart(maxLength, '0')
  ychar = ychar.padStart(maxLength, '0')
  let res = 0
  for(let i = 0; i < maxLength; i++) {
    if(xchar[i] !== ychar[i]) res++
  }
  return res
}