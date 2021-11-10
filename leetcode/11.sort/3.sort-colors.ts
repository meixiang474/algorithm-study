// leetcode 75

export default function sortColors(colors: number[]) {
  const swap = (arr: number[],i : number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  let l = -1, i = 0, r = colors.length
  while(i < r) {
    if(colors[i] === 0) {
      l++
      swap(colors, i, l)
      i++
    }else if(colors[i] === 2) {
      r--
      swap(colors, i, r)
    }else {
      i++
    }
  }
}