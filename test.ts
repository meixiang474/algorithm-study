// offer 18
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function deleteNode(head: ListNode | null, val: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === val) {
      break;
    }
    prev = prev.next;
  }
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
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
    if (index === word.length) {
      return node.isWord;
    }
    const current = word[index];
    if (current !== ".") {
      if (!node.next.has(current)) return false;
      return this.match(node.next.get(current)!, word, index + 1);
    } else {
      for (let [, item] of node.next) {
        const res = this.match(item, word, index + 1);
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
    return this.sumNode(current);
  }
  sumNode(node: TrieNode1): number {
    let res = node.value;
    for (let [, item] of node.next) {
      res += this.sumNode(item);
    }
    return res;
  }
}

// stack 1-5
export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export function simplifyPath(path: string) {
  const dirs = path.split("/");
  const stack: string[] = [];
  for (let item of dirs) {
    if (item === "" || item === ".") continue;
    if (item === "..") {
      stack.pop();
      continue;
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}

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

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return null;
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (p || stack.length > 0) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current;
  }
  return res;
}

export function zigzagLevelTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length > 0) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return res;
}
