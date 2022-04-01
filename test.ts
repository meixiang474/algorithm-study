// offer 27
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

export function mirrorTree(root: TreeNode | null) {
  if (!root) return null;
  const res = new TreeNode(root.val);
  const dfs = (node: TreeNode, newNode: TreeNode) => {
    if (node.left) {
      newNode.right = new TreeNode(node.left.val);
      dfs(node.left, newNode.right);
    }
    if (node.right) {
      newNode.left = new TreeNode(node.right.val);
      dfs(node.right, newNode.left);
    }
  };
  dfs(root, res);
  return res;
}
// stack
export class Stack {
  items: number[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== current) return false;
    }
  }
  return stack.length === 0;
}

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  min() {
    if (this.isEmpty()) throw new Error("error");
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
      this.items = this.items.map((item) => item + val);
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export function preOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return res;
}

export function decToBi(num: number) {
  const queue: number[] = [];
  while (num) {
    queue.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseInt(queue.join(""));
}

// leetcode backtracking 6-10
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (nums.length - index + path.length < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function exist(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    map[r][c] = true;
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index] &&
        !map[nextR][nextC]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    map[r][c] = false;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
}

export function subsetsWithDup(nums: number[]) {
  const res: number[][] = [];
  nums.sort((a, b) => a - b);
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length >= length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue;
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function restoreIpAddresses(s: string) {
  const ips: string[] = [];
  const res: string[] = [];
  const dfs = (index: number) => {
    if (ips.length === 4 && index === s.length) {
      res.push(ips.join("."));
    }
    if (index === s.length) return;
    if (s[index] === "0") {
      ips.push(s[index]);
      dfs(index + 1);
      ips.pop();
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      item = item * 10 + parseInt(s[i]);
      if (item > 0 && item <= 255) {
        ips.push(item.toString());
        dfs(i + 1);
        ips.pop();
      } else {
        break;
      }
    }
  };
  dfs(0);
  return res;
}
