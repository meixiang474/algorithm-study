import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 12
export function exists(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index === word.length - 1) return true;
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
        board[nextR][nextC] === word[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    if (res) {
      return true;
    }
    board[r][c] = temp;
    return false;
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

// bst
export class BSTSet<T = number> {
  bst: BST<T>;
  constructor() {
    this.bst = new BST<T>();
  }
  getSize() {
    return this.bst.getSize();
  }
  isEmpty() {
    return this.bst.isEmpty();
  }
  add(e: T) {
    this.bst.add(e);
  }
  contains(e: T) {
    return this.bst.contains(e);
  }
  remove(e: T) {
    this.bst.remove(e);
  }
}

export class LinkedListSet<T> {
  list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList<T>(-1 as any);
  }
  getSize() {
    return this.list.getSize();
  }
  isEmpty() {
    return this.list.isEmpty();
  }
  contains(e: T) {
    return this.list.contains(e);
  }
  add(e: T) {
    if (!this.list.contains(e)) {
      this.list.addFirst(e);
    }
  }
  remove(e: T) {
    this.list.removeElement(e);
  }
}

export function intersection(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function uniqueMorse(word: string[]) {
  const arr = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  const set = new Set<string>();
  for (let item of word) {
    const code = item.split("").reduce((memo, current) => {
      return memo + arr[current.charCodeAt(0) - "a".charCodeAt(0)];
    }, "");
    set.add(code);
  }
  return set.size;
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
