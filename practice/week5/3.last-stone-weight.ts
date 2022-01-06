// leetcode 1046

import { Heap } from "./1.heap";

export default function lastStoneWeight(stones: number[]) {
  const heap = new Heap("max");
  for (let item of stones) {
    heap.insert(item);
  }
  while (heap.size() > 1) {
    const first = heap.pop();
    const second = heap.pop();
    if (first > second) {
      heap.insert(first - second);
    }
  }
  if (heap.size() === 0) return 0;
  return heap.peek();
}
