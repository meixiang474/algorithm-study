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

// offer 12 13
export function exists(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index === word.length - 1) return true;
    const temp = board[r][c];
    const res = (board[r][c] = "");
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index + 1]
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
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
}

export function movingCount(m: number, n: number, k: number) {
  if (m === 0 || n === 0) return 0;
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
    map[r][c] = true;
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
        !map[nextR][nextC]
      ) {
        const sum =
          nextR
            .toString()
            .split("")
            .map((i) => parseFloat(i))
            .reduce((a, b) => a + b) +
          nextC
            .toString()
            .split("")
            .map((i) => parseFloat(i))
            .reduce((a, b) => a + b);
        if (sum <= k) {
          dfs(nextR, nextC);
        }
      }
    });
  };
  dfs(0, 0);
  return res;
}

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: T) {
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
  map.set("{", "}");
  map.set("(", ")");
  map.set("[", "]");
  const stack: string[] = [];
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const res = stack.pop();
      if (res == null || map.get(res) !== item) return false;
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
    while (this.queue.length === 0 || item <= this.queue[0]) {
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
  peek() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getMin() {
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
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }
  return res;
}

export function decToBi(num: number) {
  const queue: number[] = [];
  while (num) {
    queue.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(queue.join(""));
}

// hot 89-92
export function findAnagrams(s: string, p: string) {
  if (s.length < p.length) return [];
  const smap = new Array(26).fill(0);
  const pmap = new Array(26).fill(0);
  const res: number[] = [];
  for (let i = 0; i < p.length; i++) {
    smap[s[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    pmap[p[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  if (smap.toString() === pmap.toString()) res.push(0);
  for (let i = 0; i < s.length - p.length; i++) {
    smap[s[i].charCodeAt(0) - "a".charCodeAt(0)]--;
    smap[s[i + p.length].charCodeAt(0) - "a".charCodeAt(0)]++;
    if (smap.toString() === pmap.toString()) res.push(i + 1);
  }
  return res;
}

export function findDisappearedNumbers(nums: number[]) {
  for (let item of nums) {
    const index = (item - 1) % nums.length;
    nums[index] += nums.length;
  }
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= nums.length) res.push(i + 1);
  }
  return res;
}

export function hammingDistance(num1: number, num2: number) {
  let num1Bi = num1.toString(2);
  let num2Bi = num2.toString(2);
  const maxLength = Math.max(num1Bi.length, num2Bi.length);
  if (num1Bi.length !== num2Bi.length) {
    num1Bi = num1Bi.padStart(maxLength, "0");
    num2Bi = num2Bi.padStart(maxLength, "0");
  }
  let res = 0;
  for (let i = 0; i < maxLength; i++) {
    if (num1Bi[i] !== num2Bi[i]) {
      res++;
    }
  }
  return res;
}

export function findTargetSumWays(nums: number[], target: number) {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b);
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) return 0;
  const dp = Array.from({ length: nums.length }, () =>
    new Array(diff / 2 + 1).fill(0)
  );
  dp[0][0] = 1;
  for (let i = 1; i <= nums.length; i++) {
    const current = nums[i - 1];
    for (let j = 0; j <= diff / 2; j++) {
      dp[i][j] = dp[i - 1][j];
      if (current <= j) {
        dp[i][j] += dp[i - 1][j - current];
      }
    }
  }
  return dp[nums.length][diff / 2];
}

// twoponinters 6-10
export function removeNthFromEnd(head: ListNode | null, n: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let current: ListNode | null = dummyHead;
  const stack: ListNode[] = [];
  while (current) {
    stack.push(current);
    current = current.next;
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
// todo  
}
