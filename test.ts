export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 39
export function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
    if (map.get(item)! > nums.length / 2) {
      return item;
    }
  }
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
    const mid = Math.floor(l + (r - l) / 2);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    this.buildSegmentTree(leftTreeIndex, l, mid);
    this.buildSegmentTree(rightTreeIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex]!,
      this.tree[rightTreeIndex]!
    );
  }
  leftChild(index: number) {
    return 2 * index + 1;
  }
  rightChild(index: number) {
    return 2 * index + 2;
  }
  getSize() {
    return this.data.length;
  }
  get(index: number) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    return this.data[index];
  }
  query(l: number, r: number) {
    if (l < 0 || l >= this.data.length || r < 0 || r >= this.data.length)
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
      return this.tree[treeIndex]!;
    }
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryL > mid) {
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
    }
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (index >= mid + 1) {
      this.setNode(rightTreeIndex, mid + 1, r, index, val);
    }
    if (index <= mid) {
      this.setNode(leftTreeIndex, l, mid, index, val);
    }
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex]!,
      this.tree[rightTreeIndex]!
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
  constructor(arr: number[]) {
    this.data = [...arr];
    this.tree = new Array(4 * this.data.length).fill(0);
    this.buildTree(0, 0, this.data.length - 1);
  }
  buildTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftTreeIndex = this.getLeftIndex(treeIndex);
    const rightTreeIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildTree(leftTreeIndex, l, mid);
    this.buildTree(rightTreeIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex]!,
      this.tree[rightTreeIndex]!
    );
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  merge(a: number, b: number) {
    return a + b;
  }
  sumRange(l: number, r: number) {
    if (l < 0 || l >= this.data.length || r < 0 || r >= this.data.length)
      throw new Error("error");
    this.query(0, 0, this.data.length - 1, l, r);
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
    const leftTreeIndex = this.getLeftIndex(treeIndex);
    const rightTreeIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.query(rightTreeIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.query(rightTreeIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.query(leftTreeIndex, l, mid, queryl, mid),
      this.query(rightTreeIndex, mid + 1, r, mid + 1, queryr)
    );
  }
}

export class NumArray1 {
  sums: number[];
  constructor(arr: number[]) {
    this.sums = new Array(arr.length + 1).fill(0);
    for (let i = 1; i < arr.length; i++) {
      this.sums[i] = this.sums[i - 1] + arr[i - 1];
    }
  }
  sumRange(l: number, r: number) {
    return this.sums[r + 1] - this.sums[l];
  }
}

export class NumArray2 {
  sums: number[];
  data: number[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.sums = new Array(nums.length + 1).fill(0);
    for (let i = 1; i < nums.length; i++) {
      this.sums[i] = this.sums[i - 1] + nums[i - 1];
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
    this.tree = new Array(4 * this.data.length).fill(null);
    this.buildTree(0, 0, this.data.length - 1);
  }
  buildTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
    }
    const leftTreeIndex = this.getLeftIndex(treeIndex);
    const rightTreeIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildTree(leftTreeIndex, l, mid);
    this.buildTree(rightTreeIndex, mid + 1, r);
    this.merge(this.tree[leftTreeIndex]!, this.tree[rightTreeIndex]!);
  }
  merge(a: number, b: number) {
    return a + b;
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 1;
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
    const leftTreeIndex = this.getLeftIndex(treeIndex);
    const rightTreeIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.query(rightTreeIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.query(leftTreeIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.query(leftTreeIndex, l, mid, queryl, mid),
      this.query(rightTreeIndex, mid + 1, r, mid + 1, queryr)
    );
  }
  update(index: number, val: number) {
    if (index < 0 || index >= this.data.length) throw new Error("error");
    this.data[index] = val;
    this.setNode(0, 0, this.data.length - 1, index, val);
  }
  setNode(treeIndex: number, l: number, r: number, index: number, val: number) {
    if (l >= r) {
      this.tree[treeIndex] = val;
      return;
    }
    const leftTreeIndex = this.getLeftIndex(treeIndex);
    const rightTreeIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (index >= mid + 1) {
      this.setNode(rightTreeIndex, mid + 1, r, index, val);
    }
    if (index <= mid) {
      this.setNode(leftTreeIndex, l, mid, index, val);
    }
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex]!,
      this.tree[rightTreeIndex]!
    );
  }
}

// hot 9 - 12
export function letterCombinations(digit: string) {
  if (digit.length === 0) return [];
  const graph: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const res: string[] = [];
  const dfs = (path: string) => {
    if (path.length === digit.length) {
      res.push(path);
      return;
    }
    const current = digit[path.length];
    const arr = graph[current];
    for (let item of arr) {
      dfs(path + item);
    }
  };
  dfs("");
  return res;
}

export function removeNthFromEnd1(head: ListNode | null, n: number) {
  if (!head) return null;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let current: ListNode | null = dummyHead;
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (!prev) return null;
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
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

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val > p2.val) {
      p3.next = p2;
      p2 = p2.next;
    } else {
      p3.next = p1;
      p1 = p1.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return res.next;
}

// leetcode union-find 1-5
export function solve(board: string[][]) {
  if (board.length === 0 || board[0].length === 0) return;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number) => {
    board[r][c] = "A";
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === "O"
      ) {
        dfs(nextR, nextC);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    if (board[r][0] === "O") {
      dfs(r, 0);
    }
    if (board[r][n - 1] === "O") {
      dfs(r, n - 1);
    }
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === "O") {
      dfs(0, c);
    }
    if (board[m - 1][c] === "O") {
      dfs(m - 1, c);
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "A") {
        board[r][c] = "O";
      } else {
        board[r][c] = "X";
      }
    }
  }
}
