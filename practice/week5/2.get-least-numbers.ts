// 剑指offer 40

import { Heap } from "./1.heap"

export default function getLeastNumbers(arr: number[], k: number) {
  if(k >= arr.length) return arr
  const minHeap = new Heap('max')
  for(let item of arr) {
    minHeap.insert(item)
    if(minHeap.size() > k) {
      minHeap.pop()
    }
  }
  return minHeap.heap
}