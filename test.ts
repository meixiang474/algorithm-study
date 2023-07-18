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
  cache: Map<number, DLinkedListNode>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.size = 0;
    this.head = new DLinkedListNode(-1, -1);
    this.tail = new DLinkedListNode(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.cache = new Map();
  }
  get(key: number) {
    const cacheNode = this.cache.get(key);
    if (!cacheNode) return -1;
    this.moveToHead(cacheNode);
    return cacheNode.value;
  }
  removeNode(node: DLinkedListNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
  addToHead(node: DLinkedListNode) {
    node.next = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next!.prev = node;
  }
  moveToHead(node: DLinkedListNode) {
    this.removeNode(node);
    this.addToHead(node);
  }
  put(key: number, value: number) {
    const cacheNode = this.cache.get(key);
    if (!cacheNode) {
      const node = new DLinkedListNode(key, value);
      this.addToHead(node);
      this.cache.set(key, node);
      this.size++;
      if (this.size > this.capacity) {
        const tail = this.tail.prev!;
        this.removeNode(tail);
        this.cache.delete(tail.key);
        this.size--;
      }
    } else {
      cacheNode.value = value;
      this.removeNode(cacheNode);
    }
  }
}

// two pointers 1 - 5
export function longestSubstring(s: string) {
  let res = 0;
  const map = new Map<string, number>();
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

export function maxArea(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  let res = 0;
  while (l < r) {
    const left = nums[l];
    const right = nums[r];
    res = Math.min(left, right) * (r - l);
    if (left < right) {
      l++;
    } else {
      r--;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (current + nums[i + 1] + nums[i + 2] > 0) break;
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[nums.length - 2] + nums[nums.length - 1] < 0) break;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = left + right + current;
      if (sum === 0) {
        res.push([current, left, right]);
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
      } else {
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      }
    }
  }
  return res;
}

export function threeSumClosest(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  let res = 0;
  let diff = Infinity;
  for(let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    // todo
  }
}
