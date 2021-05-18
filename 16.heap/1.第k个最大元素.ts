// 215
import MinHeap from './MinHeap';
const findKthLargest = (nums: number[], k: number) => {
  const heap = new MinHeap();
  nums.forEach((item) => {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
  });
  return heap.peek();
};
