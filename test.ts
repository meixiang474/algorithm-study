// 7

import { threeSum } from "./leetcode/1.array/15.Three Sum";

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

export const buildTree = (
  preorder: number[],
  inorder: number[]
): TreeNode | null => {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootVal = preorder[0];
  const rootNode = new TreeNode(rootVal);
  const rootIndex = inorder.findIndex((item) => item === rootVal);
  rootNode.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  rootNode.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return rootNode;
};

// 9

export class CQueue {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  appendTail(value: number): void {
    this.stack1.push(value);
  }

  deleteHead(): number {
    if (this.stack1.length === 0) return -1;
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

// stack

export class Stack {
  items: number[];
  constructor() {
    this.items = [];
  }
  push(item: number) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.pop()!;
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
}

export const isValid = (s: string) => {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("[", "]");
  map.set("(", ")");
  map.set("{", "}");
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const res = stack.pop();
      if (!res || map.get(res) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (item <= this.queue[0] || this.queue.length === 0) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length == 0) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  getMin() {
    if (this.items.length === 0) throw new Error("error");
    return this.queue[0];
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
}

export class CustomStack {
  items: number[];
  maxSize: number;
  constructor(maxSize: number) {
    this.items = [];
    this.maxSize = maxSize;
  }
  push(item: number) {
    if (this.items.length >= this.maxSize) return;
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) return -1;
    return this.items[this.items.length - 1];
  }
  ins(k: number, val: number) {
    if (k >= this.items.length) {
      this.items = this.items.map((item) => item + val);
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export const preOrderTraversal = (root: TreeNode | null) => {
  if (!root) return [];
  const stack = [root];
  const res: number[] = [];
  while (stack.length > 0) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }
  return res;
};

export const fn = (num: number) => {
  const queue: number[] = [];
  while (num) {
    queue.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(queue.join(""));
};
