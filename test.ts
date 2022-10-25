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

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.get(item)) {
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
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr) && map.get(currentr)! >= l) {
      l = map.get(currentr)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(currentr, r);
    r++;
  }
  return res;
}

export function shortestSubstring(s: string, t: string) {
  if (s === t) return s;
  const need = new Map<string, number>();
  for (let item of t) {
    need.set(item, need.has(item) ? need.get(item)! + 1 : 1);
  }
  let needType = need.size;
  let l = 0,
    r = 0;
  let res = "";
  while (r < s.length) {
    const currentr = s[r];
    if (need.has(currentr)) {
      need.set(currentr, need.get(currentr)! - 1);
      if (need.get(currentr) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const currentl = s[l];
      if (need.has(currentl)) {
        need.set(currentl, need.get(currentl)! + 1);
        if (need.get(currentl) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}

// hot 53 - 56
export function sortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const next = slow!.next;
  slow!.next = null;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const dummyHead = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = dummyHead;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
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
  return dummyHead.next;
}

export function maxProduct(nums: number[]) {
  const max = [nums[0]];
  const min = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    max[i] = Math.max(nums[i] * max[i - 1], nums[i] * min[i - 1], nums[i]);
    min[i] = Math.min(nums[i] * min[i - 1], nums[i] * max[i - 1], nums[i]);
  }
  return Math.max(...max);
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
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    const item = this.items.pop();
    if (item === this.queue[0]) this.queue.shift();
    return item;
  }
  getMin() {
    return this.queue[0];
  }
  top() {
    return this.items[this.items.length - 1];
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  let p1 = headA;
  let p2 = headB;
  while (p1 !== p2) {
    p1 = p1 ? p1.next : headB;
    p2 = p2 ? p2.next : headA;
  }
  return p1;
}

// dfs 6-10
export function sortedArrayToBST(nums: number[]) {
  if (nums.length === 0) return null;
  const mid = Math.floor((nums.length - 1) / 2);
  const node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));
  return node;
}

export function sortedListToBST(head: ListNode | null) {
  const buildTree = (head: ListNode | null, tail: ListNode | null) => {
    if (head === tail) return null;
    const node = getMid(head, tail);
    const res = new TreeNode(node.val);
    res.left = buildTree(head, node);
    res.right = buildTree(node.next, tail);
    return res;
  };
  const getMid = (head: ListNode | null, tail: ListNode | null) => {
    let slow = head,
      fast = head;
    while (slow !== tail && fast !== tail && fast?.next !== tail) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    return slow!;
  };
  return buildTree(head, null);
}

export function isBalanced(root: TreeNode | null) {
  // todo
}
