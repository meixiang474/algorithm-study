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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 58-II 59-II
export function reverseLeftWords(s: string, n: number) {
  const tail = s.slice(n);
  const front = s.slice(0, n);
  return tail + front;
}

export class MaxQueue {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  enqueue(item: number) {
    this.items.push(item);
    while (this.queue.length > 0 && this.queue[this.queue.length - 1] < item) {
      this.queue.pop();
    }
    this.queue.push(item);
  }
  dequeue() {
    if (this.items.length === 0) return -1;
    const res = this.items.shift()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  getMax() {
    if (this.items.length === 0) return -1;
    return this.queue[0];
  }
}

// set map
export class BSTSet<T = number> {
  bst: BST<T>;
  constructor() {
    this.bst = new BST();
  }
  getSize() {
    return this.bst.getSize();
  }
  isEmpty() {
    return this.bst.isEmpty();
  }
  add(item: T) {
    this.bst.add(item);
  }
  contains(item: T) {
    return this.bst.contains(item);
  }
  remove(item: T) {
    this.bst.remove(item);
  }
}

export class LinkListSet<T = number> {
  list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList(-1 as any);
  }
  getSize() {
    return this.list.getSize();
  }
  isEmpty() {
    return this.list.isEmpty();
  }
  contains(item: T) {
    return this.list.contains(item);
  }
  add(item: T) {
    if (!this.list.contains(item)) {
      this.list.addFirst(item);
    }
  }
  remove(item: T) {
    this.list.removeElement(item);
  }
}

export function fn(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function uniqueMorse(words: string[]) {
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
  for (let item of words) {
    const code = item.split("").reduce((memo, current) => {
      return memo + arr[current.charCodeAt(0) - "a".charCodeAt(0)];
    }, "");
    set.add(code);
  }
  return set.size;
}

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
    return node ? node.value : null;
  }
  add(key: K, value: V) {
    const node = this.getNode(key);
    if (node == null) {
      this.dummyHead.next = new LinkedListMapNode(
        key,
        value,
        this.dummyHead.next
      );
    } else {
      node.value = value;
    }
  }
  set(key: K, value: V) {
    const node = this.getNode(key);
    if (!node) throw new Error("error");
    node.value = value;
  }
  remove(key: K) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.key === key) {
        break;
      }
      prev = prev.next;
    }
    if (prev.next) {
      const node = prev.next;
      prev.next = prev.next.next;
      this.size--;
      return node.value;
    }
    return null;
  }
}

export class BSTMapNode<K = number, V = any> {
  key: K;
  value: V;
  left: BSTMapNode<K, V> | null;
  right: BSTMapNode<K, V> | null;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BSTMap<K = number, V = any> {
  root: BSTMapNode<K, V> | null;
  size: number;
  constructor(compare: (a: K, b: K) => boolean) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  compare(a: K, b: K) {
    return a < b;
  }
  add(key: K, value: V) {
    this.root = this.addNode(key, value, this.root);
  }
  addNode(key: K, value: V, node: BSTMapNode<K, V> | null) {
    if (!node) {
      this.size++;
      return new BSTMapNode(key, value);
    }
    if (this.compare(node.key, key)) {
      node.right = this.addNode(key, value, node.right);
    } else if (this.compare(key, node.key)) {
      node.left = this.addNode(key, value, node.left);
    } else {
      node.value = value;
    }
    return node;
  }
  getNode(node: BSTMapNode<K, V> | null, key: K): BSTMapNode<K, V> | null {
    if (!node) return null;
    if (this.compare(node.key, key)) {
      return this.getNode(node.right, key);
    } else if (this.compare(key, node.key)) {
      return this.getNode(node.left, key);
    } else {
      return node;
    }
  }
  contains(key: K) {
    return this.getNode(this.root, key) != null;
  }
  get(key: K) {
    const node = this.getNode(this.root, key);
    return node ? node.value : null;
  }
  set(key: K, value: V) {
    const node = this.getNode(this.root, key);
    if (!node) throw new Error("error");
    node.value = value;
  }
  minimumNode(node: BSTMapNode<K, V>): BSTMapNode<K, V> {
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  removeMinNode(node: BSTMapNode<K, V>) {
    if (!node.left) {
      this.size--;
      return node.right;
    }
    node.left = this.removeMinNode(node.left);
    return node;
  }
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (!node) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: BSTMapNode<K, V> | null, key: K) {
    if (!node) return null;
    if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    if (this.compare(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (!node.left) {
      this.size--;
      return node.right;
    } else if (!node.right) {
      this.size--;
      return node.left;
    } else {
      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right);
      return successor;
    }
  }
}

// todo

// hot 49 - 52
export function wordBreak(s: string, wordDict: string[]) {
  const dp = [true];
  for (let i = 1; i <= s.length; i++) {
    dp[i] = false;
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

export function hasCycle(head: ListNode | null) {
  if (!head) return false;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

export function detectCycle(head: ListNode | null) {
  if (!head) return null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  let hasCycle = false;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }
  if (!hasCycle) return null;
  let res: ListNode | null = head;
  while (res && slow) {
    if (res === slow) {
      return res;
    }
    res = res.next;
    slow = slow.next;
  }
}

export class DLinkedListNode {
  key: number;
  value: number;
  prev: DLinkedListNode | null;
  next: DLinkedListNode | null;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LURCache {
  capacity: number;
  size: number;
  head: DLinkedListNode;
  tail: DLinkedListNode;
  cache: Map<number, DLinkedListNode>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.size = 0;
    this.head = new DLinkedListNode(-1, -1);
    this.tail = new DLinkedListNode(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.cache = new Map();
  }
  addToHead(node: DLinkedListNode) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next = node;
    node.next!.prev = node;
  }
  removeNode(node: DLinkedListNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
  moveToHead(node: DLinkedListNode) {
    this.removeNode(node);
    this.addToHead(node);
  }
  get(key: number) {
    const cacheNode = this.cache.get(key);
    if (!cacheNode) return -1;
    this.moveToHead(cacheNode);
    return cacheNode.value;
  }
  put(key: number, value: number) {
    const cacheNode = this.cache.get(key);
    if (!cacheNode) {
      const newNode = new DLinkedListNode(key, value);
      this.cache.set(key, newNode);
      this.size++;
      if (this.size > this.capacity) {
        const tail = this.tail.prev!;
        this.removeNode(tail);
        this.cache.delete(tail.key);
        this.size--;
      }
    } else {
      this.moveToHead(cacheNode);
      cacheNode.value = value;
    }
  }
}

// bfs 6-10
export function rightSideView(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    res[level] = current.val;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
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

export function canFinish(numsCourses: number, prerequisites: number[][]) {
  const inDegree: number[] = new Array(numsCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;
    if (map.has(prerequisites[i][1])) {
      map.get(prerequisites[i][1])?.push(prerequisites[i][0]);
    } else {
      map.set(prerequisites[i][1], [prerequisites[i][0]]);
    }
  }
  let count = 0;
  const queue: number[] = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    const current = queue.shift()!;
    count++;
    const arr = map.get(current);
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--;
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }
  return count === numsCourses;
}

export function findOrder(numCourses: number, prerequisites: number[][]) {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;
    if (map.has(prerequisites[i][1])) {
      map.get(prerequisites[i][1])?.push(prerequisites[i][0]);
    } else {
      map.set(prerequisites[i][1], [prerequisites[i][0]]);
    }
  }
  const queue: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current);
    const arr = map.get(current);
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--;
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }
  return res.length === numCourses ? res : [];
}

export function largestValues(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (res[level] != null) {
      res[level] = Math.max(res[level], current.val);
    } else {
      res[level] = current.val;
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}
