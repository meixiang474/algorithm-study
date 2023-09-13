class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// offer 9 - 12
export class CQueue<T> {
  stack1: T[];
  stack2: T[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: T) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.stack1.length === 0) throw new Error('error');
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

export function fib(n: number) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function numWays(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function minArray(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] < nums[r]) {
      r = mid;
    } else if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r--;
    }
  }
  return nums[l];
}

export function exists(matrix: string[][], words: string) {
  if (!words) return true;
  if (!matrix.length || !matrix[0].length) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index === words.length - 1) return true;
    const temp = matrix[r][c];
    const res = (matrix[r][c] = '');
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        matrix[nextR][nextC] === words[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
    });
    matrix[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === words[0]) {
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
}

// array

export function isObject<T>(obj: T) {
  return typeof obj === 'object' && obj;
}

export function isEqual<T>(a: T, b: T) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const lengthA = Object.keys(a as any).length;
  const lengthB = Object.keys(b as any).length;
  if (lengthA !== lengthB) return false;
  for (let key in a) {
    if ((a as any).hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(data: T[], target: T) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) return i;
  }
  return -1;
}

export function selectionSort(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[minIndex] < res[j] ? minIndex : j;
    }
    if (minIndex !== i) {
      swap(res, i, minIndex);
    }
  }
  return res;
}

export function insertionSort(nums: number[]) {
  const res = [...nums];
  for (let i = 0; i < res.length; i++) {
    const current = res[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export class MyArray<T> {
  data: (T | null)[];
  size: number;
  constructor(capacity: number = 10) {
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
  add(index: number, val: T) {
    if (index < 0 || index > this.size) throw new Error('error');
    if (this.size === this.data.length) this.resize(2 * this.data.length);
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
    if (index < 0 || index >= this.size) throw new Error('error');
    return this.data[index]!;
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
    if (index < 0 || index >= this.size) throw new Error('error');
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.data.length / 4) &&
      Math.floor(this.data.length / 2) !== 0
    ) {
      this.resize(Math.floor(this.data.length / 2));
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
    if (index >= 0) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, val: T) {
    if (index < 0 || index >= this.size) throw new Error('error');
    this.data[index] = val;
  }
  toString() {
    let res = `MyArray: size=${this.size}, capacity=${this.data.length}\r\n[`;
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ',';
    }
    res = res.slice(0, -1) + ']';
    return res;
  }
}

export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (!this.items.length) throw new Error('error');
    return this.items.pop()!;
  }
  peek() {
    if (!this.items.length) throw new Error('error');
    return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set('(', ')');
  map.set('[', ']');
  map.set('{', '}');
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

export class MinStack {
  queue: number[];
  items: number[];
  constructor() {
    this.queue = [];
    this.items = [];
  }
  push(item: number) {
    this.items.push(item);
    if (!this.queue.length || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (!this.items.length) throw new Error('error');
    const res = this.items.pop()!;
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (!this.items.length) throw new Error('error');
    return this.items[this.items.length - 1];
  }
  min() {
    if (!this.items.length) throw new Error('error');
    return this.queue[0];
  }
}

export class CustomStack {
  max: number;
  items: number[];
  constructor(max: number) {
    this.max = max;
    this.items = [];
  }
  
}