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

// offer 6 7
export function reversePrint(head: ListNode | null) {
  const reverse = (head: ListNode | null): ListNode | null => {
    if (!head || !head.next) return head;
    const res = reverse(head.next);
    head.next.next = head;
    head.next = null;
    return res;
  };
  const newHead = reverse(head);
  let current = newHead;
  const res: number[] = [];
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res;
}

export function reversePrint1(head: ListNode | null) {
  const res: number[] = [];
  let current = head;
  while (current) {
    res.unshift(current.val);
    current = current.next;
  }
  return res;
}

export function buildTree(
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootVal = preorder[0];
  const rootIndex = inorder.findIndex((item) => item === rootVal);
  const rootNode = new TreeNode(rootVal);
  rootNode.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  rootNode.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return rootNode;
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
    return this.match(this.root, word, 0);
  }
  match(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) return node.isWord;
    const current = word[index];
    if (current === ".") {
      for (let [key, item] of node.next) {
        const res = this.match(item, word, index + 1);
        if (res) return true;
      }
      return false;
    } else {
      if (!node.next.has(current)) return false;
      return this.match(node.next.get(current)!, word, index + 1);
    }
  }
}

export class MapSumNode {
  value: number;
  next: Map<string, MapSumNode>;
  constructor(value: number = 0) {
    this.value = value;
    this.next = new Map();
  }
}

export class MapSum {
  root: MapSumNode;
  constructor() {
    this.root = new MapSumNode();
  }
  insert(key: string, value: number) {
    let current = this.root;
    for (let item of key) {
      if (!current.next.has(item)) {
        current.next.set(item, new MapSumNode());
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
  sumNode(node: MapSumNode): number {
    let res = node.value;
    for (let [, item] of node.next) {
      res += this.sumNode(item);
    }
    return res;
  }
}

// hot 77-80
export function removeInvalidParentheses(s: string) {
  const isValid = (s: string) => {
    let count = 0;
    for (let item of s) {
      if (item === "(") count++;
      if (item === ")") count--;
      if (count < 0) return false;
    }
    return count === 0;
  };
  const res: string[] = [];
  let set = new Set<string>();
  set.add(s);
  while (true) {
    for (let item of set) {
      if (isValid(item)) res.push(item);
    }
    if (res.length > 0) return res;
    const newSet = new Set<string>();
    for (let item of set) {
      for (let i = 0; i < item.length; i++) {
        const current = item[i];
        if (i > 0 && current === item[i - 1]) continue;
        if (current === "(" || current === ")") {
          newSet.add(item.slice(0, i) + item.slice(i + 1));
        }
      }
    }
    set = newSet;
  }
}

export function maxProfit(prices: number[]) {
  let f0 = -prices[0];
  let f1 = 0;
  let f2 = 0;
  for (let item of prices) {
    let newf0 = Math.max(f0, f2 - item);
    let newf1 = f0 + item;
    let newf2 = Math.max(f1, f2);
    f0 = newf0;
    f1 = newf1;
    f2 = newf2;
  }
  return Math.max(f1, f2);
}

// todo

// sort 6-10
export function largestNumber(nums: number[]) {
  const res = nums
    .map((item) => item.toString())
    .sort((a, b) => parseFloat(b + a) - parseFloat(a + b))
    .join("");
  return res[0] === "0" ? "0" : res;
}

export function containsDuplicates(nums: number[], k: number, t: number) {
  const getId = (num: number) => {
    return num < 0
      ? Math.floor((num + 1) / (t + 1)) - 1
      : Math.floor(num / (t + 1));
  };
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const id = getId(current);
    if (map.has(id)) return true;
    if (map.has(id - 1) && Math.abs(current - map.get(id - 1)!) <= t)
      return true;
    if (map.has(id + 1) && Math.abs(current - map.get(id + 1)!) <= t)
      return true;
    map.set(id, current);
    if (i >= k) {
      map.delete(getId(nums[i - k]));
    }
  }
  return false;
}

export function isAnagram(s: string, t: string) {
  if (s.length !== t.length) return false;
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of t) {
    if (map.has(item)) {
      map.set(item, map.get(item)! - 1);
    }
  }
  for (let [, value] of map) {
    if (value !== 0) return false;
  }
  return true;
}

export function hIndex(citations: number[]) {
  citations.sort((a, b) => a - b);
  let h = 0,
    index = citations.length - 1;
  while (index >= 0 && citations[index] > h) {
    h++;
    index--;
  }
  return h;
}

export function wiggleSort(nums: number[]) {
  let l = Math.floor((nums.length - 1) / 2);
  let r = nums.length - 1;
  const arr = nums.slice().sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    nums[i] = i % 2 === 0 ? arr[l--] : arr[r--];
  }
}
