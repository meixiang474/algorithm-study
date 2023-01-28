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

// offer 9 10
export class QueueBasedOnStack {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: number) {
    this.stack1.push(item);
  }
  dequeue() {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop();
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

export function fib(n: number) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[n] = dp[n - 1] + dp[n - 2];
  }
  return dp[n];
}

// search sort
export function isObject<T>(obj: T) {
  return typeof obj === "object" && obj != null;
}

export function isEqual<T>(a: T, b: T) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keysA = Object.keys(a as {});
  const keysB = Object.keys(b as {});
  if (keysA.length !== keysB.length) return false;
  for (let key in a) {
    if ((a as {}).hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(data: T[], target: T) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) return i;
  }
  return -1;
}

export function selectionSort(data: number[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(res, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let current = data[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j] > res[j + 1]) {
        const temp = res[j];
        res[j] = res[j + 1];
        res[j + 1] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// hot 81-84
export function rob(root: TreeNode | null) {
  const dfs = (node: TreeNode | null) => {
    if(!node) return [0, 0]
    const l = dfs();
    // todo
  }
}

// stack 6-10
export function postorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      prevRight = current;
      res.push(current.val);
    } else {
      stack.push(current);
      p = current;
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
      let res = eval(`${n1} ${item} ${n2}`);
      res = res > 0 ? Math.floor(res) : Math.ceil(res);
      stack.push(res + "");
    } else {
      stack.push(item);
    }
  }
  return parseFloat(stack[0]);
}

export class MinStack {
  queue: number[];
  stack: number[];
  constructor() {
    this.queue = [];
    this.stack = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    const res = this.stack.pop();
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  min() {
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
    const current = this.stack.pop()!;
    this.current = current ? current.right : null;
    return current ? current.val : null;
  }
  hasNext() {
    return this.current != null || this.stack.length !== 0;
  }
}

export class MyStack {
  queue: number[];
  constructor() {
    this.queue = [];
  }
  push(item: number) {
    this.queue.push(item);
  }
  pop() {
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift();
  }
  top() {
    return this.queue[this.queue.length - 1];
  }
  empty() {
    return this.queue.length === 0;
  }
}
