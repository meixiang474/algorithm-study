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

// offer 36 38
export function treeToDoublyList(root: TreeNode | null) {
  if (!root) return null;
  const res: TreeNode[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node);
    if (node.right) dfs(node.right);
  };
  let head: TreeNode | null = null;
  let tail: TreeNode | null = null;
  for (let i = 0; i < res.length; i++) {
    if (i === 0) {
      head = tail = res[i];
      head.left = tail;
      tail.right = head;
    } else {
      let prev = tail;
      tail!.right = res[i];
      tail = tail!.right;
      tail.left = prev;
      tail.right = head;
      head!.left = tail;
    }
  }
  return head;
}

export function permutation(s: string) {
  s.split("").sort().join("");
  const map = new Map<number, boolean>();
  const res: string[] = [];
  const dfs = (path: string) => {
    if (path.length === s.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < s.length; i++) {
      if (i > 0 && s[i] === s[i - 1] && map.get(i - 1)) continue;
      if (!map.get(i)) {
        map.set(i, true);
        dfs(path + s[i]);
        map.set(i, false);
      }
    }
  };
  dfs("");
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
  // todo
}

// hot 33 - 36
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
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
  if (word.length) return true;
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    const temp = board[r][c];
    board[r][c] = "";
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    board[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 1);
        if (res) return true;
      }
    }
  }
  return false;
}

export function largestRectangleArea(heights: number[]) {
  const stack: number[] = [];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }
  stack.length = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length && heights[0] >= heights[i]) {
      heights.shift();
    }
    right[i] = stack.length ? stack[0] : heights.length;
    stack.unshift(i);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res = Math.max(res, (right[i] - left[i] - 1) * heights[i]);
  }
  return res;
}

export function maximalRectangle(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const left = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "0") continue;
      left[r][c] = c > 0 ? left[r][c - 1] + 1 : 1;
    }
  }
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (left[r][c] === 0) continue;
      let width = left[r][c];
      let area = width;
      for (let i = r - 1; i >= 0; i--) {
        if (left[i][c] === 0) break;
        width = Math.min(width, left[i][c]);
        area = Math.max(area, width * (r - i + 1));
      }
      res = Math.max(res, area);
    }
  }
  return res;
}

// sort 1-5
export function mergeField(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
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
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push(intervals[i]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function sortColors(colors: number[]) {
  let left = -1,
    right = colors.length,
    i = 0;
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  while (i < right) {
    if (colors[i] === 0) {
      left++;
      swap(colors, left, i);
      i++;
    } else if (colors[i] === 2) {
      right--;
      swap(colors, right, i);
    } else {
      i++;
    }
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
        if (prev.next.val >= current.val) break;
        prev = prev.next;
      }
      const next: ListNode | null = current.next;
      const insertCurrent = prev.next;
      prev.next = current;
      current.next = insertCurrent;
      current = next;
      lastSorted.next = next;
    }
  }
  return dummyHead.next;
}

export function sortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const next = slow!.next;
  slow!.next = null;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const dummyHead = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = dummyHead;
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
  return dummyHead.next;
}
