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

// offer 6 7
export function reversePrint(head: ListNode | null) {
  const reverse = (head: ListNode | null): ListNode | null => {
    if (!head || !head.next) return head;
    const res = reverse(head.next);
    head.next.next = head;
    head.next = null;
    return res;
  };
  const newHead = reverse(head);
  let current = newHead;
  const res: number[] = [];
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res;
}

export function reversePrint1(head: ListNode | null) {
  const res: number[] = [];
  let current = head;
  while (current) {
    res.unshift(current.val);
    current = current.next;
  }
  return res;
}

// todo

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

export class NumArray {
  data: number[];
  tree: (number | null)[];
  constructor(arr: number[]) {
    this.data = [...arr];
    this.tree = new Array(4 * this.data.length).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
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
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex] as number,
      this.tree[rightIndex] as number
    );
  }
  sumRange(left: number, right: number) {
    if (
      left < 0 ||
      right < 0 ||
      left > right ||
      left >= this.data.length ||
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
    if (l === queryl && r === queryr) return this.tree[treeIndex] as number;
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
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
  data: number[];
  constructor(arr: number[]) {
    this.data = [...arr];
    this.sums = new Array(this.data.length + 1).fill(0);
    for (let i = 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.data[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sums[right + 1] - this.sums[left];
  }
}

export class NumArray2 {
  sums: number[];
  data: number[];
  constructor(arr: number[]) {
    this.data = [...arr];
    this.sums = new Array(this.data.length + 1).fill(0);
    for (let i = 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.data[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sums[right + 1] - this.sums[left];
  }
  update(index: number, value: number) {
    this.data[index] = value;
    for (let i = index + 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.data[i - 1];
    }
  }
}

export class NumArray3 {
  data: number[];
  tree: (number | null)[];
  constructor(arr: number[]) {
    this.data = [...arr];
    this.tree = new Array(4 * this.data.length).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
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
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l > r) return;
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
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
    if (l === queryl && r === queryr) {
      return this.tree[treeIndex]!;
    }
    const mid = Math.floor(l + (r - l) / 2);
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
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

// hot 73-76
export function moveZeroes(nums: number[]) {
  let l = 0,
    r = 0;
  while (r < nums.length) {
    if (nums[r] !== 0) {
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
      l++;
    }
    r++;
  }
}

export function findDuplicate(nums: number[]) {
  let l = 1,
    r = nums.length;
  while (l > r) {
    const mid = Math.floor(l + (r - l) / 2);
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) count++;
    }
    if (count <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

export function serialize(root: TreeNode | null) {
  if (!root) return "None";
  let res = "";
  const dfs = (node: TreeNode | null) => {
    if (!node) {
      res += "None,";
      return;
    }
    res += node.val + ",";
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return res.slice(0, -1);
}

export function deserialize(s: string) {
  const order = s.split(",");
  const dfs = () => {
    const first = order.shift()!;
    if (first === "None") return null;
    const node = new TreeNode(parseFloat(first));
    node.left = dfs();
    node.right = dfs();
    return node;
  };
  return dfs();
}

export function lengthOfLIS(nums: number[]) {
  const dp = [1];
  let res = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
}

// sort 6-10
export function largestNumber(nums: number[]) {
  const res = nums
    .map((item) => item.toString())
    .sort((a, b) => parseFloat(b + a) - parseFloat(a + b))
    .join("");
  return res[0] === "0" ? "0" : res;
}

export function containsDuplicates(nums: number[], k: number, t: number) {
  const getId = (num: number) => {
    return num < 0
      ? Math.floor((num + 1) / (t + 1)) - 1
      : Math.floor(num / (t + 1));
  };
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const id = getId(current);
    if (map.has(id)) return true;
    if (map.has(id - 1) && Math.abs(current - map.get(id - 1)!) <= t)
      return true;
    if (map.has(id + 1) && Math.abs(current - map.get(id + 1)!) <= t)
      return true;
    map.set(id, current);
    if (i >= k) {
      map.delete(getId(nums[i - k]));
    }
  }
  return false;
}

export function isAnagram(s: string, t: string) {
  if (s.length !== t.length) return false;
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of t) {
    if (map.has(item)) {
      map.set(item, map.get(item)! - 1);
    }
  }
  for (let [, value] of map) {
    if (value !== 0) return false;
  }
  return true;
}

export function hIndex(citations: number[]) {
  citations.sort((a, b) => a - b);
  let h = 0,
    index = citations.length - 1;
  while (index >= 0 && citations[index] > h) {
    h++;
    index--;
  }
  return h;
}

export function wiggleSort(nums: number[]) {
  let l = Math.floor((nums.length - 1) / 2);
  let r = nums.length - 1;
  const arr = nums.slice().sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    nums[i] = i % 2 === 0 ? arr[l--] : arr[r--];
  }
}
