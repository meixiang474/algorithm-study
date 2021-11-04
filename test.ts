// offer 53-I
export default function missingNumber(nums: number[]) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// leetcode array 41
function firstMissingPositive(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      nums[i] = nums.length + 1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    const current = Math.abs(nums[i]);
    if (current <= nums.length) {
      nums[current - 1] = -Math.abs(nums[current - 1]);
    }
  }
  console.log(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }
  return nums.length + 1;
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
    return index * 2 + 1;
  }
  getRightIndex(index: number) {
    return index * 2 + 2;
  }
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) throw new Error("error");
    if (this.heap.length === 1) return this.heap.pop();
    const res = this.heap[0];
    this.heap[0] = this.heap.pop()!;
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
    if(this.heap.length === 0) throw new Error('error')
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}

export function kthLargest(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

export function topKFrequent(nums: number[], k: number) {
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
    this.val = val
    this.next = null
  }
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const res = new ListNode(-1)
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val)
  lists.forEach(item => {
    if(item) {
      heap.insert(item)
    }
  })
  let p = res
  while(heap.size()) {
    const current = heap.pop()!
    p.next = current
    if(current.next) heap.insert(current.next)
    p = p.next
  }
  return res.next
}