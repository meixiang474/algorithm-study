export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

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

// offer 49 50
export function nthUglyNumber(n: number) {
  const dp: number[] = new Array(n).fill(0);
  dp[0] = 1;
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

export function firstUniqueChar(s: string) {
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of s) {
    if (map.get(item) === 1) return item;
  }
  return " ";
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
    return this.items.length === 0;
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
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
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
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.items.pop();
    if (res === this.queue[0]) this.queue.shift();
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
    if (this.items.length <= k) {
      this.items = this.items.map((v) => v + k);
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export function preOrderTraversal(root: TreeNode | null) {
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

export function decToBi(num: number) {
  const queue: number[] = [];
  while (num) {
    queue.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(queue.join(""));
}

// hot 25-28
export function canJump(nums: number[]) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= max) {
      max = Math.max(max, nums[i] + i);
      if (max >= nums.length - 1) return true;
    }
  }
  return false;
}

export function mergeField(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    if (prevEnd >= current[0]) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, current[1]),
      ]);
    } else {
      res.push(current);
    }
    prevEnd = Math.max(prevEnd, current[1]);
  }
  return res;
}

export function uniquePaths(m: number, n: number) {
  if (m === 0 || n === 0) return 0;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}

export function minPathSum(grid: number[][]) {
  if(grid.length === 0 || grid[0].length === 0) return 0
  const m = grid.length
  const n = grid[0].length
  const dp: number[][] = Array.from({length: m}, () => new Array(n).fill(0))
  for(let r = 1; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0]
  }
  for(let c = 1; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c]
  }
  for(let r = 1; r < m; r++) {
    for(let c = 1; c < n; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]
    }
  }
  return dp[m - 1][n - 1]
}

// leetcode daily 16-20

// practice week3
export class QueueBasedOnStack {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  push(item: number) {
    this.stack1.push(item);
  }
  pop() {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop();
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  peek() {
    const res = this.pop();
    while (this.stack1.length) {
      this.stack2.push(this.stack2.pop()!);
    }
    this.stack1.push(res!);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  empty() {
    return this.stack1.length === 0;
  }
}

export function calPonits(ops: string) {
  const stack: number[] = [];
  for (let item of ops) {
    switch (item) {
      case "C":
        stack.pop();
        break;
      case "D":
        stack.push(stack[stack.length - 1] * 2);
        break;
      case "+":
        stack.push(stack[stack.length - 2] + stack[stack.length - 1]);
        break;
      default:
        stack.push(parseFloat(item));
        break;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}

export function backspaceCompare(s: string, t: string) {
  let sIndex = s.length - 1;
  let tIndex = t.length - 1;
  let sSkip = 0;
  let tSkip = 0;
  while (sIndex >= 0 || tIndex >= 0) {
    while (sIndex >= 0) {
      if (s[sIndex] === "#") {
        sIndex--;
        sSkip++;
      } else if (sSkip > 0) {
        sIndex--;
        sSkip--;
      } else {
        break;
      }
    }
    while (tIndex >= 0) {
      if (t[tIndex] === "#") {
        tIndex--;
        tSkip++;
      } else if (tSkip > 0) {
        tIndex--;
        tSkip--;
      } else {
        break;
      }
    }
    if (sIndex >= 0 && tIndex >= 0) {
      if (s[sIndex] !== t[tIndex]) return false;
    } else {
      if (sIndex >= 0 || tIndex >= 0) return false;
    }
    sIndex--;
    tIndex--;
  }
  return true;
}

export function removeToValid(s: string) {
  const stack: number[] = [];
  const removeSet = new Set<number>();
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (current === "(") {
      stack.push(i);
    } else if (current === ")") {
      if (stack.length > 0) {
        stack.pop();
      } else {
        removeSet.add(i);
      }
    }
  }
  for (let i = 0; i < stack.length; i++) {
    removeSet.add(i);
  }
  let res = "";
  for (let i = 0; i < s.length; i++) {
    if (!removeSet.has(i)) res += s[i];
  }
  return res;
}

export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
    res.push(node.val);
  };
  dfs(root);
  return res;
}

export function postOrderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let prevRight: TreeNode | null = null;
  let p: TreeNode | null = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

export function calculate(s: string) {
  const stack: number[] = [];
  let num = 0;
  let prevSign = "+";
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (!isNaN(parseFloat(item))) {
      num = num * 10 + parseFloat(item);
    }
    if ((isNaN(parseFloat(item)) && item !== " ") || i === s.length - 1) {
      switch (prevSign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop()! * num);
          break;
        case "/":
          stack.push(Math.floor(stack.pop()! / num));
          break;
        default:
          break;
      }
      num = 0;
      prevSign = item;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}
