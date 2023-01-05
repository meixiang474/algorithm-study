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

export function maxCoins(nums: number[]) {
  const n = nums.length;
  const dp = Array.from({ length: n + 2 }, () => new Array(n + 1).fill(0));
  const arr: number[] = new Array(n + 2);
  for (let i = 1; i <= n; i++) {
    arr[i] = nums[i - 1];
  }
  arr[0] = arr[n + 1] = 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 2; j <= n + 1; j++) {
      for (let k = i + 1; k < j; j++) {
        const coins = arr[i] * arr[k] * arr[j] + dp[i][k] + dp[k][j];
        dp[i][j] = Math.max(dp[i][j], coins);
      }
    }
  }
  return dp[0][n + 1];
}

export function coinChange(coins: number[], amount: number) {
  const dp: number[] = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}

// stack 6-10
export function postorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      prevRight = current;
      res.push(current.val);
    } else {
      stack.push(current);
      p = current;
    }
  }
  return res;
}

export function evalRPN(tokens: string[]) {
  const stack: string[] = [];
  for (let item of tokens) {
    if (isNaN(parseFloat(item))) {
      const n1 = stack.pop()!;
      const n2 = stack.pop()!;
      let res = eval(`${n1} ${item} ${n2}`);
      res = res > 0 ? Math.floor(res) : Math.ceil(res);
      stack.push(res + "");
    } else {
      stack.push(item);
    }
  }
  return parseFloat(stack[0]);
}

export class MinStack {
  queue: number[];
  stack: number[];
  constructor() {
    this.queue = []
    this.stack = []
  }
 // todo 
}