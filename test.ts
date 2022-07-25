export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 47 48
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
        dp[r][c] = grid[r][c] + dp[r][c - 1];
      } else if (c === 0) {
        dp[r][c] = grid[r][c] + dp[r - 1][c];
      } else {
        dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
      }
    }
  }
  return dp[m - 1][n - 1];
}

export function lengthOfLongestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
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

// array
export class MyArray<T = number> {
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
  isEmpty() {
    return this.size === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, item: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size >= this.data.length) {
      this.resize(2 * this.data.length);
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.size++;
  }
}

// hot 17-20
export function search(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] >= nums[l]) {
      if (target === nums[l]) return l;
      if (target > nums[l] && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (target === nums[r]) return r;
      if (target > nums[mid] && target < nums[r]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}

export function searchRange(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  const res = [-1, -1];
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid - 1] === target) {
        r = mid - 1;
      } else {
        res[0] = mid;
        break;
      }
    }
  }
  (l = 0), (r = nums.length - 1);
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid + 1] === target) {
        l = mid + 1;
      } else {
        res[1] = mid;
        break;
      }
    }
  }
  return res;
}

export function combinationSum(candidates: number[], target: number) {
  if (candidates.length === 0) return [];
  const res: number[][] = [];
  const dfs = (path: number[], index: number, sum: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    dfs(path.concat(candidates[index]), index, sum + candidates[index]);
    dfs(path, index + 1, sum);
  };
  dfs([], 0, 0);
  return res;
}

export function trap(nums: number[]) {
  const left: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    left[i] = Math.max(left[i - 1], nums[i]);
  }
  const right: number[] = [];
  right[nums.length - 1] = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], nums[i]);
  }
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res += Math.min(left[i], right[i]) - nums[i];
  }
  return res;
}

// leetcode daily 6-10
export function shortestToChar(s: string, c: string) {
  if (s.length === 0 || c.length === 0) return [];
  const res: number[] = [];
  let cIndex = -Infinity;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) cIndex = i;
    res[i] = i - cIndex;
  }
  cIndex = Infinity;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === c) cIndex = i;
    res[i] = Math.min(res[i], cIndex - i);
  }
  return res;
}

export function lengthLongestPath(input: string) {
  if (input.length === 0) return 0;
  let res = 0;
  const stack: number[] = [];
  let index = 0;
  while (index < input.length) {
    let depth = 0;
    while (index < input.length && input[index] === "\t") {
      depth++;
      index++;
    }
    let len = 0;
    let isFile = false;
    while (index < input.length && input[index] !== "\n") {
      if (input[index] === ".") isFile = true;
      len++;
      index++;
    }
    index++;
    len += stack[depth - 1] != null ? stack[depth - 1] + 1 : 0;
    if (isFile) {
      res = Math.max(res, len);
    } else {
      stack[depth] = len;
    }
  }
  return res;
}

export function toGoatLatin(sentence: string) {
  const arr = ["a", "e", "i", "o", "u"];
  return sentence
    .split(" ")
    .map((item, index) => {
      if (arr.includes(item[0].toLocaleLowerCase())) {
        return item + "ma" + "a".repeat(index + 1);
      } else {
        return item.slice(1) + item[0] + "ma" + "a".repeat(index + 1);
      }
    })
    .join(" ");
}

export function maxRotateFunction(nums: number[]) {
  const f0 = nums.reduce((memo, current, index) => {
    return (memo += current * index);
  }, 0);
  const sum = nums.reduce((a, b) => a + b);
  let res = f0;
  let f = f0;
  for (let i = 1; i < nums.length; i++) {
    f += sum - nums.length * nums[nums.length - i];
    res = Math.max(res, f);
  }
  return res;
}

export function binaryGap(n: number) {
  const str = n.toString(2);
  let prevIndex = -1;
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (current === "1") {
      if (prevIndex === -1) {
        prevIndex = i;
        continue;
      }
      res = Math.max(res, i - prevIndex);
      prevIndex = i;
    }
  }
  return res;
}

// practice week2
export class MyCircularQueue {
  data: (number | null)[];
  front: number;
  tail: number;
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.front = this.tail = this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.data.length;
  }
  Front() {
    if (this.isEmpty()) return -1;
    return this.data[this.front];
  }
  Rear() {
    if (this.isEmpty()) return -1;
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index];
  }
  enQueue(item: number) {
    if (this.isFull()) return false;
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
    return true;
  }
  deQueue() {
    if (this.isEmpty()) return false;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    return true;
  }
}

export function partition(head: ListNode | null, x: number) {
  if (!head || !head.next) return head;
  const minHead = new ListNode(-1);
  const maxHead = new ListNode(-1);
  let p1 = minHead,
    p2 = maxHead;
  let current: ListNode | null = head;
  while (current) {
    if (current.val < x) {
      p1.next = current;
      p1 = p1.next;
    } else {
      p2.next = current;
      p2 = p2.next;
    }
    current = current.next;
  }
  p2.next = null;
  p1.next = maxHead.next;
  return minHead.next;
}

export class MyCircularDeque {
  data: (number | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity: number) {
    this.data = new Array(capacity).fill(null);
    this.front = this.tail = this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.data.length;
  }
  insertFront(item: number) {
    if (this.isFull()) return false;
    const index = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[index] = item;
    this.size++;
    return true;
  }
  insertLast(item: number) {
    if (this.isFull()) return false;
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
    return true;
  }
  deleteFront() {
    if (this.isEmpty()) return false;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    return true;
  }
  deleteLast() {
    if (this.isEmpty()) return false;
    this.tail = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    this.data[this.tail] = null;
    this.size--;
    return true;
  }
  getFront() {
    if (this.isEmpty()) return -1;
    return this.data[this.front];
  }
  getRear() {
    if (this.isEmpty()) return -1;
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index];
  }
}

export class RecentCounter {
  queue: number[];
  constructor() {
    this.queue = [];
  }
  ping(t: number) {
    this.queue.push(t);
    while (this.queue.length) {
      const first = this.queue[0];
      if (t - first > 3000) {
        this.queue.shift();
      } else {
        break;
      }
    }
    return this.queue.length;
  }
}

export function buddyStrings(s: string, goal: string) {
  if (s.length !== goal.length) return false;
  if (s === goal) {
    const map = new Map<string, number>();
    for (let item of s) {
      map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
      if (map.get(item)! > 1) {
        return true;
      }
    }
    return false;
  }
  let first = -1;
  let second = -1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      if (first === -1) {
        first = i;
      } else if (second === -1) {
        second = i;
      } else {
        return false;
      }
    }
  }
  return s[first] === goal[second] && s[second] === goal[first];
}
