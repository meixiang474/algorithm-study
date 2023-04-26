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

// offer 28 29
export function symmetricTree(root: TreeNode | null) {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.left)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
}

export function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const map = Array.from({ length: m }, () => new Array(n).fill(false));
  const res: number[] = [];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let r = 0;
  let c = 0;
  let dIndex = 0;
  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    const newR = r + directions[dIndex][0];
    const newC = c + directions[dIndex][1];
    if (!(newR >= 0 && newR < m && newC >= 0 && newC < n && !map[newR][newC])) {
      dIndex = (dIndex + 1) % directions.length;
    }
    r += directions[dIndex][0];
    c += directions[dIndex][1];
  }
  return res;
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
  add(val: T) {
    this.bst.add(val);
  }
  contains(val: T) {
    return this.bst.contains(val);
  }
  remove(val: T) {
    this.bst.remove(val);
  }
}

export class LinkedListSet<T = number> {
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
  contains(val: T) {
    return this.list.contains(val);
  }
  add(val: T) {
    if (!this.contains(val)) {
      this.list.addFirst(val);
    }
  }
  remove(val: T) {
    this.list.removeElement(val);
  }
}

export function intersection(nums1: number[], nums2: number[]) {
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
  for (const item of words) {
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
    return this.getSize() === 0;
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
      if (prev.next.key === key) {
        break;
      }
      prev = prev.next;
    }
    if (prev.next) {
      const node = prev.next;
      this.size--;
      prev.next = node.next;
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
    this.root = this.addNode(this.root, key, value);
  }
  addNode(node: BSTMapNode<K, V> | null, key: K, value: V): BSTMapNode<K, V> {
    if (!node) {
      this.size++;
      return new BSTMapNode(key, value);
    }
    if (this.compare(node.key, key)) {
      node.right = this.addNode(node.right, key, value);
    } else if (this.compare(key, node.key)) {
      node.left = this.addNode(node.left, key, value);
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
    }
    return node;
  }
  contains(key: K) {
    return this.getNode(this.root, key) != null;
  }
  get(key: K) {
    const node = this.getNode(this.root, key);
    return node == null ? null : node.value;
  }
  set(key: K, value: V) {
    const node = this.getNode(this.root, key);
    if (node == null) throw new Error("error");
    node.value = value;
  }
  minimumNode(node: BSTMapNode<K, V>): BSTMapNode<K, V> {
    if (!node.left) {
      return node;
    }
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
    if (node == null) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: BSTMapNode<K, V> | null, key: K) {
    if (!node) return null;
    if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else if (this.compare(key, node.key)) {
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

export function intersection1(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}

export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [map.get(rest)!, i];
    }
    map.set(current, i);
  }
}

export function fn(s: string) {
  let l = 0,
    r = 0;
  const map = new Map<string, number>();
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
}

export function fn1(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let needType = map.size;
  let l = 0,
    r = 0,
    res = "";
  while (r < s.length) {
    const current = s[r];
    if (map.has(current)) {
      map.set(current, map.get(current)! - 1);
      if (map.get(current) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentl = s[l];
      if (map.has(currentl)) {
        map.set(currentl, map.get(currentl)! + 1);
        if (map.get(currentl) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}

export function intersectionTwo(nums1: number[], nums2: number[]) {
  const map = new Map<number, number>();
  for (let item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.set(item, map.get(item)! - 1);
      if (map.get(item) === 0) {
        map.delete(item);
      }
    }
  }
  return res;
}

// hot 17 - 20
export function search(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] >= nums[l]) {
      if (nums[l] === target) return l;
      if (target > nums[l] && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[r] === target) return r;
      if (target > nums[mid] && target < nums[r]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}

export function searchRange(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  const res = [-1, -1];
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid - 1] === target) {
        r = mid - 1;
      } else {
        res[0] = mid;
        break;
      }
    }
  }
  (l = 0), (r = nums.length - 1);
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid + 1] === target) {
        l = mid + 1;
      } else {
        res[1] = mid;
        break;
      }
    }
  }
  return res;
}

// todo

// dp 1-5
export function maxSubArr(nums: number[]) {
  const dp: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max(...dp);
}

export function uniquePaths(m: number, n: number) {
  if (m === 0 || n === 0) return 0;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
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

export function uniquePathsTwo(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    if (grid[r][0] === 1) break;
    dp[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    if (grid[0][c] === 1) break;
    dp[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (grid[r][c] === 1) continue;
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
  dp[0][0] = grid[0][0];
  for (let r = 1; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0];
  }
  for (let c = 1; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c];
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[m - 1][n - 1];
}

export function climeStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}
