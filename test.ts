import { Heap } from "./practice/week5/1.heap";

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

// hot 7 8
export function maxArea(heights: number[]) {
  let l = 0,
    r = heights.length;
  let res = 0;
  while (l < r) {
    res = Math.max(res, Math.min(heights[l], heights[r]) * (r - l));
    if (heights[l] > heights[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;
    if (nums[i] + nums[nums.length - 1] + nums[nums.length - 2] < 0) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = nums[i] + currentl + currentr;
      if (sum === 0) {
        res.push([nums[i], currentl, currentr]);
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else {
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
      }
    }
  }
  return res;
}

// leetcode two-pointers 6-10
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number) {
  if (!head) return null;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let p: ListNode | null = dummyHead;
  while (p) {
    stack.push(p);
    p = p.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
}

export function removeDuplicates(nums: number[]) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (i > 0 && nums[i - 1] === nums[i]) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (nums[i] === val) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function strStr(hayStack: string, needle: string) {
  if (hayStack.length === 0) return -1;
  if (hayStack.length < needle.length) return -1;
  let res = -1;
  for (let i = 0; i < hayStack.length; i++) {
    const current = hayStack[i];
    if (current === needle[0]) {
      let flag = true;
      for (let index = i + 1; index < needle.length + i; index++) {
        if (hayStack[index] !== needle[index - i]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = i;
        break;
      }
    }
  }
  return res;
}

export function rotateRight(head: ListNode | null, k: number) {
  if (!head || !head.next || k === 0) return head;
  let count = 0;
  let p: ListNode | null = head;
  let prev: ListNode | null = null;
  while (p) {
    count++;
    prev = p;
    p = p.next;
  }
  prev!.next = head;
  k = count - (k % count);
  prev = head;
  for (let i = 0; i < k - 1; i++) {
    prev = prev!.next;
  }
  const res = prev!.next;
  prev!.next = null;
  return res;
}
