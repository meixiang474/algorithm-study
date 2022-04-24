// leetcode 868

export default function binaryGap(n: number): number {
  const str = n.toString(2)
  let res = 0
  let prevIndex = -1 
  for(let i = 0; i < str.length; i++) {
      const current = str[i]
      if(str[i] === '1') {
          if(prevIndex === -1) {
              prevIndex = i
              continue;
          }
          res = Math.max(res, i - prevIndex)
          prevIndex = i
      }
  }
  return res
};