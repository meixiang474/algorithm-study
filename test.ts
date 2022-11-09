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

// offer 64 68-I
export function sumNums(n: number) {
  n && (n += sumNums(n - 1));
  return n;
}

export function lowestCommon(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  const getPath = (node: TreeNode | null) => {
    const res: TreeNode[] = [];
    let current = root;
    while (current !== node && current && node) {
      res.push(current);
      if (current.val > node.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    res.push(current!);
    return res;
  };
  let res = null;
  const pPath = getPath(p);
  const qPath = getPath(q);
  for (let i = 0; i < pPath.length && i < qPath.length; i++) {
    if (pPath[i] === qPath[i]) {
      res = pPath[i];
    } else {
      break;
    }
  }
  return res;
}

// fenzhi donggui tanxin huisu
// todo

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
  const compute = (n: number) => {
    return n
      .toString()
      .split("")
      .map((item) => parseInt(item))
      .reduce((memo, current) => {
        return memo + current ** 2;
      }, 0);
  };
  const set = new Set<number>();
  while (!set.has(n)) {
    if (n === 1) return true;
    set.add(n);
    n = compute(n);
  }
  return false;
}

export function isIsomorphic(s: string, t: string) {
  if (s.length !== t.length) return false;
  const smap = new Map<string, string>();
  const tmap = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    const scurrent = s[i];
    const tcurrent = t[i];
    if (
      (smap.has(scurrent) && smap.get(scurrent) !== tcurrent) ||
      (tmap.has(tcurrent) && tmap.get(tcurrent) !== scurrent)
    )
      return false;
    smap.set(scurrent, tcurrent);
    tmap.set(tcurrent, scurrent);
  }
  return true;
}

export function containsDuplicate(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    if (set.has(item)) return true;
    set.add(item);
  }
  return false;
}
