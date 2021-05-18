// 347
import MinHeap from './MinHeap';
const topKFrequent = (nums: number[], k: number): number[] => {
  const map = new Map<number, number>();
  nums.forEach((item) => {
    map.set(item, map.has(item) ? (map.get(item) as number) + 1 : 1);
  });
  const heap = new MinHeap<{ value: number; key: number }>((a, b) => {
    return a.value < b.value;
  });
  map.forEach((value, key) => {
    heap.insert({ value, key });
    if (heap.size() > k) heap.pop();
  });
  return heap.heap.map((item) => item.key);
};
