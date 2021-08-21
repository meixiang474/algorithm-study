// 27
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function mirror(root: TreeNode | null) {
  if (!root) return null;
  const dfs = (node: TreeNode, res: TreeNode) => {
    if (node.left) {
      res.right = new TreeNode(node.left.val);
      dfs(node.left, res.right);
    }
    if (node.right) {
      res.left = new TreeNode(node.right.val);
      dfs(node.right, res.left);
    }
  };
  const res = new TreeNode(root.val);
  dfs(root, res);
  return res;
}

// heap

export class Heap<T = number> {
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
    this.shiftUp(this.heap.length - 2);
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
  const heap = new Heap();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    heap.insert(current);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

export function topKFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (const item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const heap = new Heap<{ key: number; val: number }>((a, b) => a.val < b.val);
  map.forEach((val, key) => {
    heap.insert({ val, key });
    if (heap.size() > k) {
      heap.pop();
    }
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

export function mergeKLists(lists: (ListNode | null)[]) {
  const res = new ListNode(-1);
  const heap = new Heap<ListNode>((a, b) => a.val < b.val);
  for (let item of lists) {
    if (item) {
      heap.insert(item);
    }
  }
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
