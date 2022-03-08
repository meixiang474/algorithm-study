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

// sort 1 - 5

export function mergeField(fields: number[][]) {
  fields.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < fields.length; i++) {
    const [start, end] = fields[i];
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function insertField(intervals: number[][], newInterval: number[]) {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function sortColors(colors: number[]) {
  let l = -1,
    i = 0,
    r = colors.length;
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(colors, l, i);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(colors, r, i);
    } else {
      i++;
    }
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function insertionSortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let lastSorted = head;
  let current: ListNode | null = head.next;
  while (current) {
    if (lastSorted.val <= current.val) {
      lastSorted = current;
      current = current.next;
    } else {
      let prev = dummyHead;
      while (prev.next) {
        if (prev.next.val > current.val) break;
        prev = prev.next;
      }
      const insertNext = prev.next;
      const next: ListNode | null = current.next;
      prev.next = current;
      current.next = insertNext;
      current = next;
      lastSorted.next = next;
    }
  }
  return dummyHead.next;
}

export function sortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow = head,
    fast = head;
  while (slow && fast && fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const next = slow.next;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return l3.next;
}
