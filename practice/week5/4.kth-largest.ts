// leetcode 703

import { Heap } from "./1.heap";

export default class KthLargest {
  k: number;
  heap: Heap;
  constructor(k: number, nums: number[]) {
    this.k = k;
    this.heap = new Heap();
    for (let item of nums) {
      this.heap.insert(item);
      if(this.heap.size() > k) {
        this.heap.pop()
      }
    }
  }
  add(val: number) {
    this.heap.insert(val);
    if(this.heap.size() > this.k) {
      this.heap.pop()
    }
    return this.heap.peek()
  }
}
