import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
import { Heap } from "./practice/week5/1.heap";
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

export class ListNode1 {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 14-I 14-II
export function cuttingRope(n: number) {
  const compute = (m: number) => {
    const floor = Math.floor(n / m);
    const ceil = Math.ceil(n / m);
    return Math.max(
      ceil ** (m - 1) * (n - (m - 1) * ceil),
      floor ** (m - 1) * (n - (m - 1) * floor)
    );
  };
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = Math.max(res, compute(i));
  }
  return res;
}

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

// queue
export class Queue<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.shift()!;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[0];
  }
  toString() {
    return this.items.toString();
  }
}

export class LoopQueue<T = number> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length - 1;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail - this.front + this.data.length;
  }
  isEmpty() {
    return this.getSize();
  }
  resize(newCapacity: number) {
    const newData = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front] as T;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

// todo
export class Deque<T = number> {
  data: (T | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
  }
  addLast(e: T) {
    if (this.getSize() === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(e: T) {
    if (this.getSize() === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front === 0 ? this.data.length - 1 : this.front - 1;
    this.data[this.front] = e;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front] as T;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeLast() {
    if (this.isEmpty()) throw new Error("error");
    this.tail = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    const res = this.data[this.tail] as T;
    this.data[this.tail] = null;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getSize() / 4)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    return this.data[index] as T;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class StackBasedOnQueue<T = number> {
  queue: T[];
  constructor() {
    this.queue = [];
  }
  getSize() {
    return this.queue.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: T) {
    this.queue.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift() as T;
  }
  peek() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.pop() as T;
    this.push(res);
    return res;
  }
}

export class QueueBasedOnStack<T> {
  stack1: T[];
  stack2: T[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  getSize() {
    return this.stack1.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  enqueue(item: T) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.dequeue() as T;
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    this.stack1.push(res);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

// hot 93-96
export function convertBst(root: TreeNode | null) {
  if (!root) return root;
  let sum = 0;
  const dfs = (node: TreeNode) => {
    if (node.right) dfs(node.right);
    sum += node.val;
    node.val = sum;
    if (node.left) dfs(node.left);
  };
  dfs(root);
  return root;
}

export function diameterOfBinaryTree(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    res = Math.max(left + right + 1, res);
    return Math.max(left, right) + 1;
  };
  dfs(root);
  return res;
}

export function subarraySum(nums: number[], k: number) {
  const map = new Map<number, number>()
  map.set(0, 1)
  let res = 0, pre = 0
  for(let i = 0; i < nums.length; i++) {
    // todo
  }
}

// twoponinters 6-10
export function removeNthFromEnd(head: ListNode | null, n: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let current: ListNode | null = dummyHead;
  const stack: ListNode[] = [];
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
}

export function removeDuplicates(nums: number[]) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (i > 0 && nums[i - 1] === nums[i]) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    const current = nums[i];
    if (current === val) {
      res--;
      for (let j = 0; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function strStr(hayStack: string, needle: string) {
  if (!needle) return 0;
  let res = -1;
  let index = 0;
  while (index < hayStack.length) {
    const current = hayStack[index];
    if (hayStack.length - index < needle.length) break;
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < needle.length + index; i++) {
        if (hayStack[i] !== needle[i - index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = index;
        break;
      }
    }
    index++;
  }
  return res;
}

export function rotateRight(head: ListNode | null, k: number) {
  if (k === 0 || !head || !head.next) return;
  let count = 1;
  let current = head;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  k = count - (k % count);
  let prev = head;
  for (let i = 0; i < k - 1; k++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}
