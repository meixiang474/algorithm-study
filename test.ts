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

// offer 48 49
export function lengthOfLongestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
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

export function nthUglyNumber(n: number) {
  const dp = [1];
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 1; i < n; i++) {
    const n1 = dp[a] * 2;
    const n2 = dp[b] * 3;
    const n3 = dp[c] * 5;
    dp[i] = Math.min(n1, n2, n3);
    if (dp[i] === n1) a++;
    if (dp[i] === n2) b++;
    if (dp[i] === n3) c++;
  }
  return dp[n - 1];
}

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  toString() {
    return this.items.toString();
  }
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
      const prev = stack.pop()!;
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
}

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    // todo
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
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    let isEqual = false;
    if (i > 0 && current === nums[i]) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = left + right + current;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        diff = newDiff;
        res = sum;
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        }
      }
    }
    if (isEqual) {
      break;
    }
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
      nums[nums.length - 1] +
      nums[nums.length - 2] +
      nums[nums.length - 3]
    )
      break;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (currentj > i + 1 && currentj === nums[j - 1]) continue;
      if (currentj + current + nums[j + 1] + nums[j + 2] > target) break;
      if (current + currentj + nums[nums.length - 1] + nums[nums.length - 2])
        break;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const left = nums[l];
        const right = nums[r];
        const sum = left + right + current + currentj;
        if (sum === target) {
          res.push([left, right, currentj, current]);
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        }
      }
    }
  }
  return res;
}
