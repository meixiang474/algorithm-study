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
  // todo
}

// hot 73-76
export function moveZeroes(nums: number[]) {
  let l = 0,
    r = 0;
  while (r < nums.length) {
    if (nums[r] !== 0) {
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
      l++;
    }
    r++;
  }
}

export function findDuplicate(nums: number[]) {
  let l = 1,
    r = nums.length;
  while (l > r) {
    const mid = Math.floor(l + (r - l) / 2);
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) count++;
    }
    if (count <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

export function serialize(root: TreeNode | null) {
  if (!root) return "None";
  let res = "";
  const dfs = (node: TreeNode | null) => {
    if (!node) {
      res += "None,";
      return;
    }
    res += node.val + ",";
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return res.slice(0, -1);
}

export function deserialize(s: string) {
  const order = s.split(",");
  const dfs = () => {
    const first = order.shift()!;
    if (first === "None") return null;
    const node = new TreeNode(parseFloat(first));
    node.left = dfs();
    node.right = dfs();
    return node;
  };
  return dfs();
}

export function lengthOfLIS(nums: number[]) {
  const dp = [1];
  let res = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
}

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
