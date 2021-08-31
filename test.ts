// 31

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

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift()!;
    res.push(current.val);
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }
  return res;
}

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  toString() {
    return this.items.toString();
  }
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export class MinStack {
  items: number[];
  list: number[];
  constructor() {
    this.items = [];
    this.list = [];
  }
  push(item: number) {
    this.items.push(item);
    if (this.list.length === 0 || this.list[0] >= item) {
      this.list.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.list[0]) {
      this.list.shift();
    }
    return res;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getMin() {
    if (this.items.length === 0) throw new Error("error");
    return this.list[0];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toString() {
    return this.items.length.toString();
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
    if (this.items.length >= this.maxSize) {
      return;
    }
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) return -1;
    return this.items.pop()!;
  }
  inc(k: number, val: number) {
    if (k >= this.items.length) {
      this.items = this.items.map((item) => item + val);
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export function preOrder(root: TreeNode | null) {
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
}

export function DecToBi(num: number) {
  const queue: number[] = [];
  while (num) {
    queue.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(queue.join(""));
}
