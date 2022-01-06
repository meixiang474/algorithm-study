// offer 68-I

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function lowestCommon(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  const getPath = (node: TreeNode | null) => {
    const res: TreeNode[] = [];
    let current = root;
    while (current !== node && node && current) {
      res.push(current);
      if (current.val > node.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    res.push(current!);
    return res;
  };
  const plist = getPath(p);
  const qlist = getPath(q);
  let res = null;
  for (let i = 0; i < plist.length && i < qlist.length; i++) {
    if (plist[i] === qlist[i]) {
      res = plist[i];
    } else {
      break;
    }
  }
  return res;
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

export function findKthLargest(nums: number[], k: number) {
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
  const heap = new MinHeap<{ key: number; value: number }>(
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

export function mergeKLists(lists: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  for (let item of lists) {
    if (item) heap.insert(item);
  }
  const res = new ListNode(-1);
  let p = res;
  while (heap.size() > 0) {
    const current = heap.pop();
    p.next = current;
    p = p.next;
    if (current.next) heap.insert(current.next);
  }
  return res.next;
}
