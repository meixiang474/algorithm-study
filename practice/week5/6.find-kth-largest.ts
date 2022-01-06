// leetcode 215

import { Heap } from "./1.heap";

export default function findKthLargest(nums: number[], k: number) {
  const heap = new Heap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}
