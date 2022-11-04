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

export class ListNode1 {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 62 63
export function lastRemaining(n: number, m: number) {
  const f = (n: number, m: number): number => {
    if (n === 1) return 0;
    const x = f(n - 1, m);
    return (m + x) % n;
  };
  return f(n, m);
}

export function maxProfit1(prices: number[]) {
  let max = 0;
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    max = Math.max(max, current - min);
    min = Math.min(min, current);
  }
  return max;
}

// heap
export class MinHeap<T = number> {
  heap: T[];
  constructor(compare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare || this.compare;
  }
  compare(a: T, b: T) {
    return a < b;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  insert(item: T) {
    this.heap.push(item);
    this.shiftUp(this.heap.length - 1);
  }
  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndeex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) throw new Error("error");
    if (this.heap.length === 1) return this.heap.pop();
    const res = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.shiftDown(0);
    return res;
  }
  shiftDown(index: number) {
    const leftIndex = this.getLeftIndeex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] != null &&
      this.compare(this.heap[index], this.heap[leftIndex])
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] != null &&
      this.compare(this.heap[index], this.heap[rightIndex])
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  peek() {
    if (this.heap.length === 0) throw new Error("error");
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

export function findKthLargest(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

export function topKFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const heap = new MinHeap<{ value: number; key: number }>(
    (a, b) => a.value < b.value
  );
  for (let [key, value] of map) {
    heap.insert({ key, value });
    if (heap.size() > k) heap.pop();
  }
  return heap.heap.map((item) => item.key);
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  for (let item of lists) {
    if (item) heap.insert(item);
  }
  let res = new ListNode(-1);
  let p = res;
  while (heap.size()) {
    const current = heap.pop()!;
    p.next = current;
    p = p.next;
    if (current.next) heap.insert(current.next);
  }
  return res.next;
}

// hot 61 - 64
export function canFinish(numCourses: number, prerequisites: number[][]) {
  const degree = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let [item1, item2] of prerequisites) {
    degree[item1]++;
    if (map.has(item2)) {
      map.get(item2)!.push(item1);
    } else {
      map.set(item2, [item1]);
    }
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (degree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length) {
    const current = queue.shift()!;
    count++;
    const arr = map.get(current);
    if (arr && arr.length) {
      for (let item of arr) {
        degree[item]--;
        if (degree[item] === 0) {
          queue.push(item);
        }
      }
    }
  }
  return count === numCourses;
}

export class TrieNode {
  isWord: boolean;
  map: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.map = new Map();
  }
}

export class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  insert(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.map.has(item)) current.map.set(item, new TrieNode());
      current = current.map.get(item)!;
    }
    current.isWord = true;
  }
  search(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.map.has(item)) return false;
      current = current.map.get(item)!;
    }
    return current.isWord;
  }
  startsWith(prefix: string) {
    let current = this.root;
    for (let item of prefix) {
      if (!current.map.has(item)) return false;
      current = current.map.get(item)!;
    }
    return true;
  }
}

export function findKthLargest1(nums: number[], k: number) {
  k = nums.length - k;
  const sortArr = (nums: number[], l: number, r: number): number => {
    if (l === r) return nums[k];
    const p = partition(nums, l, r);
    if (p === k) {
      return nums[k];
    } else if (p > k) {
      return sortArr(nums, l, p - 1);
    } else {
      return sortArr(nums, p + 1, k);
    }
  };
  const swap = (nums: number[], i: number, j: number) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (j >= i && nums[l] > nums[i]) {
        i++;
      }
      while (j >= i && nums[l] < nums[j]) {
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

export function maximalSquare(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "0") continue;
      if (r === 0 || c === 0) {
        dp[r][c] = 1;
      } else {
        dp[r][c] = Math.min(dp[r - 1][c - 1], dp[r][c - 1], dp[r - 1][c]) + 1;
      }
      res = Math.max(res, dp[r][c]);
    }
  }
  return res ** 2;
}

// hashtable 6-10
export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: ListNode | null) {
  if (!head) return head;
  const map = new Map<ListNode, ListNode>();
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    map.set(node, newNode);
    if (node.random) {
      if (!map.has(node.random)) {
        dfs(node.random);
      }
      newNode.random = map.get(node.random)!;
    }
    if (node.next) {
      if (!map.has(node.next)) {
        dfs(node.next);
      }
      newNode.next = map.get(node.next)!;
    }
  };
  dfs(head);
  return map.get(head)!;
}

function isHappy(n: number) {
  // todo
}
