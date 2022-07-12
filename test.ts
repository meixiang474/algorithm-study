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

export function maxSubArray(nums: number[]) {
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

// hot 13 - 16
export function generateParenthesis(n: number) {
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length >= 2 * n) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close + 1);
    }
  };
  dfs("", 0, 0);
  return res;
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const merge = (
    lists: (ListNode | null)[],
    l: number,
    r: number
  ): ListNode | null => {
    if (l === r) return lists[l];
    if (l > r) return null;
    const mid = Math.floor(l + (r - l) / 2);
    return mergeTwo(merge(lists, l, mid), merge(lists, mid + 1, r));
  };
  const mergeTwo = (l1: ListNode | null, l2: ListNode | null) => {
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
    if (p1) p3.next = p1;
    if (p2) p3.next = p2;
    return res.next;
  };
  return merge(lists, 0, lists.length - 1);
}

export function nextPermutation(nums: number[]) {
  let left = -1,
    right = -1;
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      left = i;
      break;
    }
  }
  if (left === -1) {
    nums.reverse();
    return;
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > nums[left]) {
      right = i;
      break;
    }
  }
  swap(nums, left, right);
  const newNums = nums.slice(left + 1).reverse();
  for (let i = left + 1; i < nums.length; i++) {
    nums[i] = newNums[i - left - 1];
  }
}

export function longestValidParenthesis(s: string) {
  if (s.length === 0) return 0;
  const dp = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    if (s[i] === ")") {
      if (s[i - 1] === "(") {
        dp[i] = (dp[i - 2] || 0) + 2;
      } else {
        if (s[i - dp[i - 1] - 1] === "(") {
          dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] || 0);
        }
      }
    }
  }
  return Math.max(...dp);
}

// leetcode daily 1 - 5
export class RandomizedSet {
  nums: number[];
  map: Map<number, number>;
  constructor() {
    this.nums = [];
    this.map = new Map();
  }
  insert(item: number) {
    if (this.map.has(item)) return false;
    this.nums.push(item);
    this.map.set(item, this.nums.length - 1);
    return true;
  }
  remove(item: number) {
    if (!this.map.has(item)) return false;
    const index = this.map.get(item)!;
    this.nums[index] = this.nums[this.nums.length - 1];
    this.nums.pop();
    this.map.set(this.nums[index], index);
    this.map.delete(item);
    return true;
  }
  getRandom() {
    const index = Math.floor(Math.random() * this.nums.length);
    return this.nums[index];
  }
}

export function maximumWealth(account: number[][]) {
  return account.reduce((memo, current) => {
    return Math.max(
      memo,
      current.reduce((a, b) => a + b)
    );
  }, 0);
}

export class NestedInteger {
  val?: number;
  list: NestedInteger[];
  constructor(val?: number) {
    this.val = val;
    this.list = [];
  }
  add(item: NestedInteger) {
    this.list.push(item);
  }
}

export function deserialize(s: string) {
  let index = 0;
  const dfs = (s: string): NestedInteger => {
    if (s[index] === "[") {
      const res = new NestedInteger();
      index++;
      while (s[index] !== "]") {
        res.add(dfs(s));
        if (s[index] === ",") {
          index++;
        }
      }
      index++;
      return res;
    } else {
      let num = 0;
      let negative = false;
      if (s[index] === "-") {
        negative = true;
        index++;
      }
      while (index < s.length && !isNaN(parseInt(s[index]))) {
        num = num * 10 + parseInt(s[index]);
        index++;
      }
      if (negative) {
        num *= -1;
      }
      const res = new NestedInteger(num);
      return res;
    }
  };
  return dfs(s);
}

export function mostCommonWord(paragraph: string, banned: string[]) {
  const words = paragraph
    .replace(/[!?',;.]/g, " ")
    .split(/\s+/)
    .filter((item) => !banned.includes(item.toLocaleLowerCase()))
    .map((item) => item.toLocaleLowerCase());
  const map = new Map<string, number>();
  for (let item of words) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let count = 0,
    res = "";
  for (let [item, value] of map) {
    if (value > count) {
      count = value;
      res = item;
    }
  }
  return res;
}

export function lexicalOrder(n: number) {
  const res: number[] = [];
  let num = 1;
  for (let i = 0; i < n; i++) {
    res.push(num);
    if (num * 10 <= n) {
      num *= 10;
    } else {
      while (num % 10 === 9 || num === n) {
        num = Math.floor(num / 10);
      }
      num++;
    }
  }
  return res;
}

// practice week1
