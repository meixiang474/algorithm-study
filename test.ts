import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 13
export function movingCount(m: number, n: number, k: number) {
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
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
            .map((i) => parseInt(i))
            .reduce((a, b) => a + b) +
          nextC
            .toString()
            .split("")
            .map((i) => parseInt(i))
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

// map
export class LinkedListMapNode<K = string, V = any> {
  key: K | null;
  value: V | null;
  next: LinkedListMapNode<K, V> | null;
  constructor(
    key: K | null = null,
    value: V | null = null,
    next: LinkedListMapNode<K, V> | null = null
  ) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
  toString() {
    return `${JSON.stringify(this.key)} : ${JSON.stringify(this.value)}`;
  }
}

export class LinkedListMap<K = string, V = any> {
  dummyHead: LinkedListMapNode<K, V>;
  size: number;
  constructor() {
    this.dummyHead = new LinkedListMapNode();
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  getNode(key: K) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  contains(key: K) {
    return this.getNode(key) != null;
  }
  get(key: K) {
    const node = this.getNode(key);
    return node == null ? null : node.value;
  }
  add(key: K, value: V) {
    const node = this.getNode(key);
    if (node == null) {
      this.dummyHead.next = new LinkedListMapNode(
        key,
        value,
        this.dummyHead.next
      );
      this.size++;
    } else {
      node.value = value;
    }
  }
  set(key: K, value: V) {
    const node = this.getNode(key);
    if (node == null) throw new Error("error");
    node.value = value;
  }
  remove(key: K) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.key === key) break;
      prev = prev.next;
    }
    if (prev.next) {
      const node = prev.next;
      prev.next = node.next;
      this.size--;
      return node.value;
    }
    return null;
  }
}

// dp 1 - 5
export function maxSubArr(arr: number[]) {
  const dp = [arr[0]];
  for (let i = 0; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
  }
  return Math.max(...dp);
}

export function uniquePaths(m: number, n: number) {
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

export function uniquePathsTwo(board: number[][]) {
  if (board.length === 0 || board[0].length === 0) return 0;
  const m = board.length;
  const n = board[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    if (board[r][0] === 1) break;
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === 1) break;
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (board[r][c] === 1) continue;
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}

export function minPathSum(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0];
  }
  for (let c = 0; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c];
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[m - 1][n - 1];
}

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
