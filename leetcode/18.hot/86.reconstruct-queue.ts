// leetcode 406

export default function reconstructQueue(people: number[][]) {
  people.sort((a, b) => {
    if(a[0] !== b[0]) {
      return a[0] - b[0]
    }else {
      return b[1] - a[1]
    }
  })
  const res: number[][] = new Array(people.length).fill(null)
  for(let i = 0; i < people.length; i++) {
    const prevCount = people[i][1]
    let index = prevCount + 1
    for(let j = 0; j < people.length; j++) {
      if(res[j] == null) {
        index--
        if(index === 0) {
          res[j] = people[i]
          break
        }
      }
    }
  }
  return res
}