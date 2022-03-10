import { Heap } from "./practice/week5/1.heap";

// offer 17
export function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 0; i <= end; i++) {
    res.push(i);
  }
  return res;
}

// segment tree
export class SegmentTree<T = any> {
  data: T[];
  tree: (T | null)[];
  merge: (a: T, b: T) => T;
  constructor(arr: T[], merge: (a: T, b: T) => T) {
    this.data = [...arr];
    this.tree = new Array(4 * this.data.length).fill(null);
    this.merge = merge;
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  leftChild(index: number) {
    return 2 * index + 1;
  }
  rightChild(index: number) {
    return 2 * index + 2;
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildSegmentTree(leftTreeIndex, l, mid);
    this.buildSegmentTree(rightTreeIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex]!,
      this.tree[rightTreeIndex]!
    );
  }
  getSize() {
    return this.data.length;
  }
  get(index: number) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    return this.data[index];
  }
  query(l: number, r: number) {
    if (
      l < 0 ||
      l >= this.data.length ||
      r < 0 ||
      r > this.data.length ||
      l > r
    )
      throw new Error("error");
    return this.queryNode(0, 0, this.data.length - 1, l, r);
  }
  queryNode(
    treeIndex: number,
    l: number,
    r: number,
    queryL: number,
    queryR: number
  ): T {
    if (l === queryL && r === queryR) {
      return this.tree[treeIndex] as T;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    if (queryL >= mid + 1) {
      return this.queryNode(rightTreeIndex, mid + 1, r, queryL, queryR);
    }
    if (queryR <= mid) {
      return this.queryNode(leftTreeIndex, l, mid, queryL, queryR);
    }
    return this.merge(
      this.queryNode(leftTreeIndex, l, mid, queryL, mid),
      this.queryNode(rightTreeIndex, mid + 1, r, mid + 1, queryR)
    );
  }
  set(index: number, val: T) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    this.data[index] = val;
    this.setNode(0, 0, this.data.length - 1, index, val);
  }
  setNode(treeIndex: number, l: number, r: number, index: number, val: T) {
    if (l === r) {
      this.tree[treeIndex] = val;
      return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.leftChild(treeIndex);
    const rightIndex = this.rightChild(treeIndex);
    if (index >= mid + 1) {
      this.setNode(rightIndex, mid + 1, r, index, val);
    }
    if (index <= mid) {
      this.setNode(leftIndex, l, mid, index, val);
    }
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
  toString() {
    let res = "[";
    for (let i = 0; i < this.tree.length; i++) {
      res += JSON.stringify(this.tree[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

export class NumArray {
  data: number[];
  tree: (number | null)[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.tree = new Array(4 * this.data.length).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
  merge(a: number, b: number) {
    return a + b;
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  sumRange(left: number, right: number) {
    if (
      left < 0 ||
      left >= this.data.length ||
      right < 0 ||
      right >= this.data.length ||
      left > right
    )
      throw new Error("error");
    return this.query(0, 0, this.data.length - 1, left, right);
  }
  query(
    treeIndex: number,
    l: number,
    r: number,
    queryl: number,
    queryr: number
  ): number {
    if (queryl === l && queryr === r) return this.tree[treeIndex]!;
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.query(rightIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.query(leftIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.query(leftIndex, l, mid, queryl, mid),
      this.query(rightIndex, mid + 1, r, mid + 1, queryr)
    );
  }
}

export class NumArray1 {
  sum: number[];
  data: number[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.sum = new Array(nums.length + 1).fill(0);
    for (let i = 1; i < this.sum.length; i++) {
      this.sum[i] = this.sum[i - 1] + this.data[i - 1];
    }
  }
  update(index: number, val: number) {
    this.data[index] = val;
    for (let i = index + 1; i < this.sum.length; i++) {
      this.sum[i] = this.sum[i - 1] + this.data[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sum[right + 1] - this.sum[left];
  }
}

export class NumArray2 {
  data: number[];
  tree: (number | null)[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.tree = new Array(4 * this.data.length).fill(null);
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
  merge(a: number, b: number) {
    return a + b;
  }
  sumRange(left: number, right: number) {
    if (
      left < 0 ||
      left >= this.data.length ||
      right < 0 ||
      right >= this.data.length ||
      left > right
    )
      throw new Error("error");
    return this.query(0, 0, this.data.length - 1, left, right);
  }
  query(
    treeIndex: number,
    l: number,
    r: number,
    queryl: number,
    queryr: number
  ): number {
    if (queryl === l && queryr === r) {
      return this.tree[treeIndex]!;
    }
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.query(rightIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.query(leftIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.query(leftIndex, l, mid, queryl, mid),
      this.query(rightIndex, mid + 1, r, mid + 1, queryr)
    );
  }
  update(index: number, val: number) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    this.data[index] = val;
    this.set(0, 0, this.data.length - 1, index, val);
  }
  set(treeIndex: number, l: number, r: number, index: number, val: number) {
    if (l === r) {
      this.tree[treeIndex] = val;
      return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    if (index >= mid + 1) {
      this.set(rightIndex, mid + 1, r, index, val);
    }
    if (index <= mid) {
      this.set(leftIndex, l, mid, index, val);
    }
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
}

// stack 1-5
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
      if (!prev || map.get(prev) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export function simplifyPath(path: string) {
  const dirs = path.split("/");
  const stack: string[] = [];
  for (let item of dirs) {
    if (item === "" || item === ".") continue;
    if (item === "..") {
      stack.pop();
      continue;
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}

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

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return null;
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (p || stack.length > 0) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current;
  }
  return res;
}

export function zigzagLevelTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length > 0) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return res;
}
