// offer 35
export class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: RandomListNode | null) {
  if (!head) return null;
  const map = new Map<RandomListNode, RandomListNode>();
  const dfs = (node: RandomListNode) => {
    const newNode = new RandomListNode(node.val);
    if (node.next && !map.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = node.next ? map.get(node.next)! : null;
    if (node.random && !map.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = node.random ? map.get(node.random)! : null;
  };
  dfs(head);
  return map.get(head);
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

export function findKthLargest(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
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
  for (let [key, value] of map) {
    heap.insert({ key, value });
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.heap.map((item) => item.key);
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  for (let item of lists) {
    if (item) heap.insert(item);
  }
  const res = new ListNode(-1);
  let current = res;
  while (heap.size()) {
    const next = heap.pop();
    current.next = next;
    current = current.next;
    if (next.next) heap.insert(next.next);
  }
  return res.next;
}

// hot 3 4
export function lengthOfLongestSubstring() {

}

// leetcode stack 6-10
export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

export function evalRPN(tokens: string[]) {
  const stack: string[] = [];
  for (let item of tokens) {
    if (isNaN(parseFloat(item))) {
      const n1 = stack.pop()!;
      const n2 = stack.pop()!;
      let res: number = eval(`${n2} ${item} ${n1}`);
      res = res > 0 ? Math.floor(res) : Math.ceil(res);
      stack.push(res + "");
    } else {
      stack.push(item);
    }
  }
  return parseFloat(stack[0]);
}

export class MinStack {
  stack: number[];
  queue: number[];
  constructor() {
    this.stack = [];
    this.queue = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (!this.queue.length || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    const res = this.stack.pop();
    if (res === this.queue[0]) this.queue.shift();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.queue[0];
  }
}

export class BSTIterator {
  current: TreeNode | null;
  stack: TreeNode[];
  constructor(root: TreeNode | null) {
    this.current = root;
    this.stack = [];
  }
  next() {
    while (this.current) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    const current = this.stack.pop();
    this.current = current ? current.right : null;
    return current ? current.val : null;
  }
  hasNext() {
    return this.current != null || this.stack.length !== 0;
  }
}

export class MyStack {
  items: number[];
  constructor() {
    this.items = [];
  }
  push(item: number) {
    this.items.push(item);
    for (let i = 0; i < this.items.length - 1; i++) {
      this.items.push(this.items.shift()!);
    }
  }
  pop() {
    return this.items.shift();
  }
  top() {
    return this.items[0];
  }
  empty() {
    return this.items.length === 0;
  }
}
