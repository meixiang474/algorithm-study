export class Stack<T = number> {
  items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop()!;
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
}

export const isValid = (s: string) => {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack = [];
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const current = stack.pop();
      if (!current || map.get(current) !== item) {
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
    const res = this.items.pop()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    return this.items[this.items.length - 1];
  }
  min() {
    return this.queue[0];
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
    return this.items.pop()!;
  }
  inc(k: number, val: number) {
    if (k >= this.items.length) {
      this.items = this.items.map((item) => (item += val));
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

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

export const preOrderTraversal = (root: TreeNode | null) => {
  if (!root) return [];
  const res: number[] = [];
  const stack = [root];
  while (stack.length !== 0) {
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

export const decToBi = (num: number) => {
  const res: number[] = [];
  while (num !== 0) {
    res.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(res.join(""));
};

export const findRepeatNumber = (nums: number[]) => {
  const map = new Map<number, boolean>();
  for (let item of nums) {
    if (map.get(item)) {
      return item;
    } else {
      map.set(item, true);
    }
  }
};

export const findNumber = (matrix: number[][], target: number) => {
  if (!matrix || !matrix[0]) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const r = m - 1;
  const c = 0;
  const dfs = (r: number, c: number): boolean => {
    if (r >= m || c >= n || r < 0 || c < 0) return false;
    if (matrix[r][c] === target) {
      return true;
    } else if (matrix[r][c] < target) {
      return dfs(r, c + 1);
    } else {
      return dfs(r - 1, c);
    }
  };
  return dfs(r, c);
};
