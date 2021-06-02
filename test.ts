export class MinHeap<T = number> {
  heap: T[];
  constructor(compare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare || this.compare;
  }
  compare(a: T, b: T) {
    return a < b;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  insert(val: T) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) throw new Error("error");
    if (this.heap.length === 1) return this.heap.pop() as T;
    const res = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.shiftDown(0);
    return res;
  }
  shiftDown(index: number) {
    const rightIndex = this.getRightIndex(index);
    const leftIndex = this.getLeftIndex(index);
    if (
      this.heap[leftIndex] &&
      this.compare(this.heap[leftIndex], this.heap[index])
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.compare(this.heap[rightIndex], this.heap[index])
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  peek() {
    if (this.heap.length === 0) throw new Error("error");
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

export function fn(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    heap.insert(nums[i]);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

export function fn1(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], map.has(nums[i]) ? map.get(nums[i])! + 1 : 1);
  }
  const heap = new MinHeap<{ val: number; key: number }>(
    (a, b) => a.val < b.val
  );
  map.forEach((val, key) => {
    heap.insert({ val, key });
    if (heap.size() > k) heap.pop();
  });
  return heap.heap.map((item) => item.key);
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function fn2(list: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  for (let item of list) {
    if (item) {
      heap.insert(item);
    }
  }
  const res = new ListNode(-1);
  let p = res;
  while (heap.size()) {
    const current = heap.pop();
    p.next = current;
    p = p.next;
    if (current.next) heap.insert(current.next);
  }
  return res.next;
}
