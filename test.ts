export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 40 42
export function getLeastNumbers(nums: number[], k: number) {
  if (k >= nums.length) return [...nums];
  const sortArr = (nums: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(nums, l, r);
    if (p === k) {
      return nums.slice(0, k);
    } else if (p > k) {
      return sortArr(nums, l, p - 1);
    } else {
      return sortArr(nums, p + 1, r);
    }
  };
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (i <= j && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

export function masSubArray(nums: number[]) {
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = dp[i - 1] >= 0 ? dp[i - 1] + nums[i] : nums[i];
  }
  return Math.max(...dp);
}

// trie
export class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

export class Trie {
  root: TrieNode;
  size: number;
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  add(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) {
        current.next.set(item, new TrieNode());
      }
      current = current.next.get(item)!;
    }
    if (!current.isWord) {
      current.isWord = true;
      this.size++;
    }
  }
  contains(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) return false;
      current = current.next.get(item)!;
    }
    return current.isWord;
  }
  isPrefix(prefix: string) {
    let current = this.root;
    for (let item of prefix) {
      if (!current.next.has(item)) return false;
      current = current.next.get(item)!;
    }
    return true;
  }
}

export class WordDictionary {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) {
        current.next.set(item, new TrieNode());
      }
      current = current.next.get(item)!;
    }
    current.isWord = true;
  }
  search(word: string) {
    this.match(this.root, word, 0);
  }
  match(node: TrieNode, word: string, index: number): boolean {
    if (index >= word.length) return node.isWord;
    const current = word[index];
    if (current !== ".") {
      if (!node.next.has(current)) return false;
      return this.match(node.next.get(current)!, word, index + 1);
    } else {
      let res = false;
      for (let [, item] of node.next) {
        res = this.match(item, word, index + 1);
        if (res) return true;
      }
      return false;
    }
  }
}

export class TrieNode1 {
  value: number;
  next: Map<string, TrieNode1>;
  constructor(value: number = 0) {
    this.value = value;
    this.next = new Map();
  }
}

export class MapSum {
  root: TrieNode1;
  constructor() {
    this.root = new TrieNode1();
  }
  insert(key: string, value: number) {
    let current = this.root;
    for (let item of key) {
      if (!current.next.has(item)) {
        current.next.set(item, new TrieNode1());
      }
      current = current.next.get(item)!;
    }
    current.value = value;
  }
  sum(prefix: string) {
    let current = this.root;
    for (let item of prefix) {
      if (!current.next.has(item)) return 0;
      current = current.next.get(item)!;
    }
    this.sumNode(current);
  }
  sumNode(node: TrieNode1) {
    let res = node.value;
    for (let [, item] of node.next) {
      res += this.sumNode(item);
    }
    return res;
  }
}

// hot 9 - 12
export function letterCombinations(digit: string) {
  if (digit.length === 0) return [];
  const graph: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const res: string[] = [];
  const dfs = (path: string) => {
    if (path.length === digit.length) {
      res.push(path);
      return;
    }
    const current = digit[path.length];
    const arr = graph[current];
    for (let item of arr) {
      dfs(path + item);
    }
  };
  dfs("");
  return res;
}

export function removeNthFromEnd1(head: ListNode | null, n: number) {
  if (!head) return null;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let current: ListNode | null = dummyHead;
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (!prev) return null;
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
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
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val > p2.val) {
      p3.next = p2;
      p2 = p2.next;
    } else {
      p3.next = p1;
      p1 = p1.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return res.next;
}

// leetcode union-find 1-5
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
      dfs(0, c);
    }
    if (board[m - 1][c] === "O") {
      dfs(m - 1, c);
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "A") {
        board[r][c] = "O";
      } else {
        board[r][c] = "X";
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
    if (!map.has(equations[i][0])) {
      map.set(equations[i][0], nodeCount++);
    }
    if (!map.has(equations[i][1])) {
      map.set(equations[i][1], nodeCount++);
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
      res.push(-1);
      continue;
    }
    if (node1 === node2) {
      res.push(1);
      continue;
    }
    const queue: number[] = [node1];
    const ratios: number[] = new Array(nodeCount).fill(-1);
    ratios[node1] = 1;
    while (queue.length && ratios[node2] === -1) {
      const current = queue.shift()!;
      for (let i = 0; i < graph[current].length; i++) {
        const [node, value] = graph[current][i];
        if (ratios[node] === -1) {
          ratios[node] = ratios[current] * value;
          queue.push(node);
        }
      }
    }
    res.push(ratios[node2]);
  }
  return res;
}

export function isCircleNum(isConnected: number[][]) {
  if (isCircleNum.length === 0) return 0;
  const m = isCircleNum.length;
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
      let currentRes = 1;
      let current = item + 1;
      while (set.has(current)) {
        currentRes++;
        current++;
      }
      res = Math.max(res, currentRes);
    }
  }
  return res;
}
