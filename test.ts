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

// offer 50 51
export function firstUniqueChar(s: string) {
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of s) {
    if (map.get(item) === 1) return item;
  }
}

// todo

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
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (r: number, c: number) => {
    grid[r][c] = "0";
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
        grid[nextR][nextC] === "1"
      ) {
        dfs(nextR, nextC);
      }
    });
  };
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        res++;
        dfs(r, c);
      }
    }
  }
  return res;
}

export function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
) {
  const map = new Map<string, number>();
  let nodeCount = 0;
  for (let i = 0; i < equations.length; i++) {
    const current = equations[i];
    if (!map.has(current[0])) {
      map.set(current[0], nodeCount++);
    }
    if (!map.has(current[1])) {
      map.set(current[1], nodeCount++);
    }
  }
  const graph: [number, number][][] = new Array(nodeCount).fill(null);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < equations.length; i++) {
    const node1 = map.get(equations[i][0])!;
    const node2 = map.get(equations[i][1])!;
    graph[node1].push([node2, values[i]]);
    graph[node2].push([node1, 1 / values[i]]);
  }
  const res: number[] = [];
  for (let i = 0; i < queries.length; i++) {
    const node1 = map.get(queries[i][0]);
    const node2 = map.get(queries[i][1]);
    if (node1 == null || node2 == null) {
      res[i] = -1;
      continue;
    }
    if (node1 === node2) {
      res[i] = 1;
      continue;
    }
    const ratios: number[] = new Array(nodeCount).fill(-1);
    ratios[node1] = 1;
    const queue: number[] = [node1];
    while (queue.length && ratios[node2] === -1) {
      const current = queue.shift()!;
      for (let i = 0; i < graph[current].length; i++) {
        const [node, value] = graph[current][i];
        if (ratios[node] === -1) {
          ratios[node] = value * ratios[current];
          queue.push(node);
        }
      }
    }
    res.push(ratios[node2]);
  }
  return res;
}

export function findCircleNum(isConnected: number[][]) {
  if (isConnected.length === 0) return 0;
  const m = isConnected.length;
  const visited = new Set<number>();
  const dfs = (r: number) => {
    for (let c = 0; c < m; c++) {
      if (isConnected[r][c] === 1 && !visited.has(c)) {
        visited.add(c);
        dfs(c);
      }
    }
  };
  let res = 0;
  for (let i = 0; i < m; i++) {
    if (!visited.has(i)) {
      res++;
      dfs(i);
    }
  }
  return res;
}

export function longestConsecutive(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    set.add(item);
  }
  let res = 0;
  for (let item of nums) {
    if (!set.has(item - 1)) {
      let length = 1;
      let current = item;
      while (set.has(current + 1)) {
        length++;
        current = item + 1;
      }
      res = Math.max(res, length);
    }
  }
  return res;
}
