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

// offer 48 49
export function lengthOfLongestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function nthUglyNumber(n: number) {
  const dp = [1];
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 1; i < n; i++) {
    const n1 = dp[a] * 2;
    const n2 = dp[b] * 3;
    const n3 = dp[c] * 5;
    dp[i] = Math.min(n1, n2, n3);
    if (dp[i] === n1) a++;
    if (dp[i] === n2) b++;
    if (dp[i] === n3) c++;
  }
  return dp[n - 1];
}

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
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
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop()!;
      if (!prev || map.get(prev) !== item) return false;
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
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  min() {
    if (this.items.length === 0) throw new Error("error");
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
    if (this.items.length <= k) {
      this.items = this.items.map((item) => (item += val));
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }
}

export function decToBi(num: number) {
  if (num === 0) return 0;
  const arr: number[] = [];
  while (num) {
    arr.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(arr.join(""));
}

// hot 53 - 56
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
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
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
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return res.next;
}

export function maxProduct(nums: number[]) {
  const dpMax = [nums[0]];
  const dpMin = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dpMax[i] = Math.max(
      dpMax[i - 1] * nums[i],
      dpMin[i - 1] * nums[i],
      nums[i]
    );
    dpMin[i] = Math.min(
      dpMax[i - 1] * nums[i],
      dpMin[i - 1] * nums[i],
      nums[i]
    );
  }
  return Math.max(...dpMax);
}

export class MinStack1 {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (!this.queue.length || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    const res = this.items.pop();
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getMin() {
    if (this.items.length === 0) throw new Error("error");
    return this.queue[0];
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    p1 = p1 ? p1.next : headB;
    p2 = p2 ? p2.next : headA;
  }
  return p1;
}

// union find 1 - 5
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
      dfs(c, 0);
    }
    if (board[m - 1][c] === "O") {
      dfs(c, m - 1);
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "O") {
        board[r][c] = "X";
      } else if (board[r][c] === "A") {
        board[r][c] = "O";
      }
    }
  }
}

export function numIslands(grid: string[][]) {
  if(grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (r: number, c: number) => {
    grid[r][c] = '0';
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if(nextR >= 0 && nextR < m && nextC >= 0 && nextC < n && grid[nextR][nextC] === '1') {
        dfs(nextR, nextC);
      }
    })
  }
  let res = 0;
  for(let r = 0; r < m; r++) {
    for(let c = 0; c < n; c++) {
      // todo
    }
  }
}