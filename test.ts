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

// offer 46 47
export function translateNum(num: number) {
  const numStr = num.toString();
  const dp = [1, 1];
  for (let i = 2; i <= numStr.length; i++) {
    if (
      parseFloat(numStr.slice(i - 2, i)) > 25 ||
      parseFloat(numStr.slice(i - 2, i)) < 10
    ) {
      dp[i] = dp[i - 1];
    } else {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
  }
  return dp[numStr.length];
}

export function maxValue(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 && c === 0) {
        dp[r][c] = grid[r][c];
      } else if (r === 0) {
        dp[r][c] = dp[r][c - 1] + grid[r][c];
      } else if (c === 0) {
        dp[r][c] = dp[r - 1][c] + grid[r][c];
      } else {
        dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
      }
    }
  }
  return dp[m - 1][n - 1];
}

// array
class MyArray<T> {
  data: (T | null)[];
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, val: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.getCapacity() >= this.size) this.resize(2 * this.getCapacity());
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = val;
    this.size++;
  }
  addFirst(val: T) {
    this.add(0, val);
  }
  addLast(val: T) {
    this.add(this.size, val);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index];
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(val: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === val) return true;
    }
    return false;
  }
  find(val: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === val) return i;
    }
    return -1;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 2) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(val: T) {
    const index = this.find(val);
    if (index !== -1) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, val: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = val;
  }
  toString() {
    let res = `MyArray: capacity=${this.getCapacity()}, size=${this.getSize()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

// hot 49 - 52
export function wordBreak(s: string, wordDict: string[]) {
  const dp = [true];
  const set = new Set(wordDict);
  for (let i = 1; i <= s.length; i++) {
    dp[i] = false;
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

export function hasCycle(head: ListNode | null) {
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
  let slow = head;
  let fast = head;
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
  let p = head;
  while (p && slow) {
    if (p === slow) return p;
    p = p.next;
    slow = slow.next;
  }
}

export class DLinkedListNode {
  key: number;
  value: number;
  next: DLinkedListNode | null;
  prev: DLinkedListNode | null;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LRUCache {
  capacity: number;
  size: number;
  head: DLinkedListNode;
  tail: DLinkedListNode;
  cache: Map<number, DLinkedListNode>
  constructor(capacity: number) {
    this.capacity = capacity;
    this.size = 0;
    this.head = new DLinkedListNode(-1, -1);
    this.tail = new DLinkedListNode(-1, -1);
    this.cache = new Map();
  } 
  // todo
}

// tree 1 - 5
export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  const res: number[] = [];
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}

export function inorderTraversal1(root: TreeNode | null) {
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

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) dp[i] = 0;
    for (let j = 1; j <= i; j++) {
      dp[i] = dp[i] + dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function isValidBST(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (node: TreeNode, floor: number, ceil: number): boolean => {
    if (node.val <= floor || node.val >= ceil) return false;
    return (
      (!node.left || dfs(node.left, floor, node.val)) &&
      (!node.right || dfs(node.right, node.val, ceil))
    );
  };
  return dfs(root, -Infinity, Infinity);
}

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  )
    return true;
  return false;
}

export function isSymmetric(root: TreeNode | null) {
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
