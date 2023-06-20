import { Heap } from "./practice/week5/1.heap";
import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 39 40
export function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
    if (map.get(item)! > nums.length / 2) return item;
  }
}

export function getLeastNumbers(nums: number[], k: number) {
  const arr = [...nums];
  if (k >= arr.length) return arr;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr(arr, 0, arr.length - 1);
}

export class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

export class Trie {
  root: TrieNode;
  size: number;
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }
  add(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) {
        current.next.set(item, new TrieNode());
      }
      current = current.next.get(item)!;
    }
    if (!current.isWord) {
      current.isWord = true;
      this.size++;
    }
  }
  contains(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) return false;
      current = current.next.get(item)!;
    }
    return current.isWord;
  }
  // todo
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
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftIndex = this.leftChild(treeIndex);
    const rightIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
  getSize() {
    return this.data.length;
  }
  get(index: number) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    return this.data[index];
  }
  leftChild(index: number) {
    return 2 * index + 1;
  }
  rightChild(index: number) {
    return 2 * index + 1;
  }
  query(l: number, r: number) {
    if (
      l < 0 ||
      l >= this.data.length ||
      r < 0 ||
      r >= this.data.length ||
      l > r
    )
      throw new Error("errorr");
    return this.queryNode(0, 0, this.data.length - 1, l, r);
  }
  queryNode(
    treeIndex: number,
    l: number,
    r: number,
    queryl: number,
    queryr: number
  ): T {
    if (l === queryl && r === queryr) {
      return this.tree[treeIndex]!;
    }
    const leftIndex = this.leftChild(treeIndex);
    const rightIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.queryNode(rightIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.queryNode(leftIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.queryNode(leftIndex, l, mid, queryl, mid),
      this.queryNode(rightIndex, mid + 1, r, mid + 1, queryr)
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
    const leftIndex = this.leftChild(treeIndex);
    const rightIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
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
    return res.slice(0, -1) + "]";
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
    if (l > r) return;
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
      right >= this.data.length
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
    if (l === queryl && r === queryr) {
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
}

export class NumArray1 {
  sums: number[];
  constructor(nums: number[]) {
    this.sums = new Array(nums.length + 1).fill(0);
    for (let i = 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + nums[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sums[right + 1] - this.sums[left];
  }
}

export class NumArray2 {
  data: number[];
  sums: number[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.sums = new Array(this.data.length + 1).fill(0);
    for (let i = 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.data[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sums[right + 1] - this.sums[left];
  }
  update(index: number, val: number) {
    this.data[index] = val;
    for (let i = index + 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.data[i - 1];
    }
  }
}

export class NumArray3 {
  data: number[];
  tree: (number | null)[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.tree = new Array(this.data.length * 4).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
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
      right >= this.data.length
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
    if (l === queryl && r === queryr) return this.tree[treeIndex]!;
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
    } else {
      this.set(leftIndex, l, mid, index, val);
    }
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
}

// hot 37 - 40
export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  let p: TreeNode | null = root;
  const stack: TreeNode[] = [];
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) dp[i] = 0;
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function isValidBST(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (node: TreeNode, floor: number, ceil: number): boolean => {
    if (node.val <= floor || node.val >= ceil) return false;
    return (
      (!node.left || dfs(node.left, floor, node.val)) &&
      (!node.right || dfs(node.right, node.val, ceil))
    );
  };
  return dfs(root, -Infinity, Infinity);
}

export function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      dfs(p.left, q.right) &&
      dfs(p.right, q.left)
    )
      return true;
    return false;
  };
  return dfs(root.left, root.right);
}

// stack 1-5
export function isValid(s: string) {
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
}

export function simplifyPath(path: string) {
  const dirs = path.split("/");
  const stack: string[] = [];
  for (let item of dirs) {
    if (item === "." || item === "") continue;
    if (item === "..") {
      stack.pop();
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}

export function inorderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}

export function zigzagLevelOrder(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    level % 2 === 0 ? arr.push(current.val) : arr.unshift(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const stack: TreeNode[] = [root];
  const res: number[] = [];
  while (stack.length) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return res;
}
