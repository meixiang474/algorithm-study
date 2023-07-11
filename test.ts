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

// offer 39 40
export function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
    if (map.get(item)! > nums.length / 2) return item;
  }
}

export function getLeastNumbers(nums: number[], k: number) {
  const arr = [...nums];
  if (k >= arr.length) return arr;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr(arr, 0, arr.length - 1);
}

export class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

// trie
export class Trie {
  root: TrieNode;
  size: number;
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
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
    if (current !== ".") {
      if (!node.next.has(current)) return false;
      return this.match(node.next.get(current)!, word, index + 1);
    } else {
      for (let [, item] of node.next) {
        const res = this.match(item, word, index + 1);
        if (res) return res;
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

// hot 41 - 44
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) res = Math.max(res, level);
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}

export function buildTree(
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootValue = preorder[0];
  const rootIndex = inorder.indexOf(rootValue);
  const rootNode = new TreeNode(rootValue);
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

export function flatten(root: TreeNode | null) {
  if (!root) return null;
  const dummyHead = new TreeNode(-1);
  let p = dummyHead;
  const dfs = (node: TreeNode) => {
    const left = node.left;
    const right = node.right;
    node.left = null;
    node.right = null;
    p.right = node;
    p = p.right;
    if (left) {
      dfs(left);
    }
    if (right) {
      dfs(right);
    }
  };
  dfs(root);
}

// string 1 - 5
export function longestSubstring(s: string) {
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
    map.set(current, r);
    r++;
  }
  return res;
}

export function letterCombinations(digits: string) {
  if (digits === "") return "";
  const map: Record<string, string[]> = {
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
  const dfs = (path: string, index: number) => {
    if (index >= digits.length) {
      res.push(path);
      return;
    }
    const current = digits[index];
    const arr = map[current];
    for (let item of arr) {
      dfs(path + item, index + 1);
    }
  };
  dfs("", 0);
  return res;
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

// todo