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

// offer 4 5
export function findNumberIn2DArray(matrix: number[][], target: number) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number): boolean => {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target) {
      return c - 1 >= 0 && dfs(r, c - 1);
    } else {
      return r + 1 < m && dfs(r + 1, c);
    }
  };
  return dfs(0, n - 1);
}
export function replaceSpace(s: string) {
  return s.replace(/\s/g, "%20");
}

// segment tree
export class SegmentTree<T = number> {
  data: T[];
  tree: (T | null)[];
  merge: (a: T, b: T) => T;
  constructor(arr: T[], merge: (a: T, b: T) => T) {
    this.data = [...arr];
    this.merge = merge;
    this.tree = new Array(4 * this.data.length).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
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
    if (
      l < 0 ||
      l >= this.data.length ||
      r < 0 ||
      r >= this.data.length ||
      l > r
    )
      throw new Error("error");
    return this.queryNode(0, 0, this.data.length - 1, l, r);
  }
  queryNode(
    treeIndex: number,
    l: number,
    r: number,
    queryl: number,
    queryr: number
  ): T {
    if (l === queryl && r === queryr) return this.tree[treeIndex]!;
    const mid = Math.floor(l + (r - l) / 2);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    if (queryl >= mid + 1) {
      return this.queryNode(rightTreeIndex, mid + 1, r, queryl, queryr);
    } else if (queryr <= mid) {
      return this.queryNode(leftTreeIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.queryNode(leftTreeIndex, l, mid, queryl, mid),
      this.queryNode(rightTreeIndex, mid + 1, r, mid + 1, queryr)
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
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    if (index >= mid + 1) {
      this.setNode(rightTreeIndex, mid + 1, r, index, val);
    } else {
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

// todo

// hot 69-72
export function maxSlidingWindow(nums: number[], k: number) {
  if (nums.length === 0 || k === 0) return [];
  const stack: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    stack.push(i);
  }
  res.push(nums[stack[0]]);
  for (let i = k; i < nums.length; i++) {
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    stack.push(i);
    if (stack[0] <= i - k) stack.shift();
    res.push(nums[stack[0]]);
  }
  return res;
}

export function searchMatrix(matrix: number[][], target: number) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number): boolean => {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target) {
      return c - 1 >= 0 && dfs(r, c - 1);
    } else {
      return r + 1 < m && dfs(r + 1, c);
    }
  };
  return dfs(0, n - 1);
}

export function minMeetingRooms(intervals: number[][]) {
  const map = new Array(intervals.length).fill(false);
  const dfs = (stop: number) => {
    let l = 0,
      r = intervals.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (intervals[mid][0] >= stop) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    while (map[l]) {
      l++;
    }
    if (l >= intervals.length) return;
    map[l] = true;
    dfs(intervals[l][1]);
  };
  let res = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (!map[i]) {
      res++;
      dfs(intervals[i][1]);
    }
  }
  return res;
}

export function numSquares(n: number) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  const dp = [0];
  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    for (let j = 1; j ** 2 <= i; j++) {
      min = Math.min(min, dp[i - j ** 2]);
    }
    dp[i] = min + 1;
  }
  return dp[n];
}

// math 6-10
export function powerOfTwo(n: number): boolean {
  if (n === 0) return false;
  if (n === 1) return true;
  if (n % 2 !== 0) return false;
  return powerOfTwo(n / 2);
}

export function isUgly(n: number) {
  if (n <= 0) return false;
  const arr = [2, 3, 5];
  for (let item of arr) {
    while (n % item === 0) {
      n /= item;
    }
  }
  return n === 1;
}

export function powerOfThree(n: number): boolean {
  if (n === 0) return false;
  if (n === 1) return true;
  if (n % 3 !== 0) return false;
  return powerOfThree(n / 3);
}

export function integerBreak(n: number) {
  const arr = [1, 2, 4, 6, 9];
  if (n <= 6) return arr[n - 2];
  let res = 1;
  while (n > 6) {
    res *= 3;
    n -= 3;
  }
  return res * arr[n - 2];
}

export function countNumbers(n: number) {
  if (n === 0) return 1;
  if (n === 1) return 10;
  let res = 10;
  let current = 9;
  for (let i = 0; i < n - 1; i++) {
    current *= 9 - i;
    res += current;
  }
  return res;
}
