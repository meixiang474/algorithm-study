// offer 14-II
export function cuttingRope1(n: number) {
  const arr = [0, 0, 1, 2, 4];
  if (n < 5) {
    return arr[n];
  }
  let res = 1;
  while (n >= 5) {
    res *= 3;
    n -= 3;
  }
  return res * n;
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
    if (this.heap.length === 1) return this.heap.pop()!;
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
      this.shiftUp(rightIndex);
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

export function findKthLargest(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    heap.insert(nums[i]);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

// linkedlist 1 - 5
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function addTwo(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next;
}

export function removeNthFromEnd(head: ListNode | null, n: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let current: ListNode | null = dummyHead;
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  prev.next = prev.next!.next;
  return dummyHead.next;
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  while (p1 && p2) {
    if (p1.val > p2.val) {
      p3.next = p2;
      p2 = p2.next;
    } else {
      p3.next = p1;
      p1 = p1.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return l3.next;
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const merge = (
    lists: (ListNode | null)[],
    l: number,
    r: number
  ): ListNode | null => {
    if (l === r) return lists[l];
    if (l > r) return null;
    const mid = Math.floor(l + (r - l) / 2);
    return mergeTwoList(merge(lists, l, mid), merge(lists, mid + 1, r));
  };
  const mergeTwoList = (l1: ListNode | null, l2: ListNode | null) => {
    const l3 = new ListNode(-1);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    while (p1 && p2) {
      if (p1.val < p2.val) {
        p3.next = p1;
        p1 = p1.next;
      } else {
        p3.next = p2;
        p2 = p2.next;
      }
      p3 = p3.next;
    }
    if (p1) p3.next = p1;
    if (p2) p3.next = p2;
    return l3.next;
  };
  return merge(lists, 0, lists.length - 1);
}

export function swapPairs(head: ListNode | null) {
  if (!head || !head.next) return head;
  const nextHead = head.next;
  const res = swapPairs(nextHead.next);
  head.next = res;
  nextHead.next = head;
  return nextHead;
}
