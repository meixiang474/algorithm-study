// offer 45
export function minNumber(nums: number[]) {
  return nums
    .map((item) => item + "")
    .sort((a, b) => parseInt(a + b) - parseInt(b + 1))
    .join("");
}

// leetcode array 1

export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [map.get(rest), i];
    }
    map.set(current, i);
  }
}

// heap

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
  insert(val: T) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
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
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
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
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] != null &&
      this.compare(this.heap[leftIndex], this.heap[index])
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] != null &&
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

export function findKMax(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    heap.insert(current);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

export function findKMaxFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const heap = new MinHeap<{ value: number; key: number }>(
    (a, b) => a.value < b.value
  );
  map.forEach((value, key) => {
    heap.insert({ value, key });
    if (heap.size() > k) {
      heap.pop();
    }
  });
  return heap.heap.map((item) => item.key);
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function mergeKLists(list: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  list.forEach((item) => {
    if (item) {
      heap.insert(item);
    }
  });
  const res = new ListNode(-1);
  let p = res;
  while (heap.size() > 0) {
    const current = heap.pop();
    p.next = current;
    p = p.next;
    if (current.next) {
      heap.insert(current.next);
    }
  }
  return res.next;
}
