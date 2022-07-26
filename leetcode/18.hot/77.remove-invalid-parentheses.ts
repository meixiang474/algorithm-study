// leetcode 301

export default function removeInvalidParentheses(s: string) {
  const isValid = (s: string) => {
    let count = 0 
    for(let item of s) {
      if(item === '(') count++
      if(item === ')') {
        count--
        if(count < 0) return false
      } 
    }
    return count === 0
  }
  const res: string[] = []
  let set = new Set<string>()
  set.add(s)
  while(true) {
    for(let item of set) {
      if(isValid(item)) res.push(item)
    }
    if(res.length > 0) return res
    const nextSet = new Set<string>()
    for(let str of set) {
      for(let i = 0; i < str.length; i++) {
        const current = str[i]
        if(i > 0 && current === str[i - 1]) continue
        if(current === '(' || current === ')') {
          nextSet.add(str.slice(0, i) + str.slice(i + 1))
        }
      }
    } 
    set = nextSet
  }
}
