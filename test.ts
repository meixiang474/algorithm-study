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

// offer 14-I 14-II
export function cuttingRope(n: number) {
  const compute = (m: number) => {
    const floor = Math.floor(n / m);
    const ceil = Math.ceil(n / m);
    return Math.max(
      ceil ** (m - 1) * (n - (m - 1) * ceil),
      floor ** (m - 1) * (n - (m - 1) * floor)
    );
  };
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = Math.max(res, compute(i));
  }
  return res;
}

export function cuttingRope1(n: number) {
  const arr = [0, 0, 1, 2, 4];
  if (n < 5) {
    return arr[n];
  }
  let res = 1;
  while (n >= 5) {
    res *= 3;
    n -= 3;
  }
  return res * n;
}

// queue
export class Queue<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.shift()!;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[0];
  }
  toString() {
    return this.items.toString();
  }
}

export class LoopQueue<T = number> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length - 1;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail - this.front + this.data.length;
  }
  isEmpty() {
    return this.getSize();
  }
  resize(newCapacity: number) {
    const newData = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front] as T;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

// todo
export class Deque<T = number> {
  data: (T | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
  }
  addLast(e: T) {
    if (this.getSize() === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(e: T) {
    if (this.getSize() === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front === 0 ? this.data.length - 1 : this.front - 1;
    this.data[this.front] = e;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front] as T;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeLast() {
    if (this.isEmpty()) throw new Error("error");
    this.tail = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    const res = this.data[this.tail] as T;
    this.data[this.tail] = null;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getSize() / 4)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    return this.data[index] as T;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`
    res += 'front ['
    for(let i = 0; i < this.getSize(); i++) {
      // todo
    }
  }
}

// hot 89-92
export function findAnagrams(s: string, p: string) {
  if (s.length < p.length) return [];
  const smap = new Array(26).fill(0);
  const pmap = new Array(26).fill(0);
  const res: number[] = [];
  for (let i = 0; i < p.length; i++) {
    smap[s[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    pmap[p[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  if (smap.toString() === pmap.toString()) res.push(0);
  for (let i = 0; i < s.length - p.length; i++) {
    smap[s[i].charCodeAt(0) - "a".charCodeAt(0)]--;
    smap[s[i + p.length].charCodeAt(0) - "a".charCodeAt(0)]++;
    if (smap.toString() === pmap.toString()) res.push(i + 1);
  }
  return res;
}

export function findDisappearedNumbers(nums: number[]) {
  for (let item of nums) {
    const index = (item - 1) % nums.length;
    nums[index] += nums.length;
  }
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= nums.length) res.push(i + 1);
  }
  return res;
}

export function hammingDistance(num1: number, num2: number) {
  let num1Bi = num1.toString(2);
  let num2Bi = num2.toString(2);
  const maxLength = Math.max(num1Bi.length, num2Bi.length);
  if (num1Bi.length !== num2Bi.length) {
    num1Bi = num1Bi.padStart(maxLength, "0");
    num2Bi = num2Bi.padStart(maxLength, "0");
  }
  let res = 0;
  for (let i = 0; i < maxLength; i++) {
    if (num1Bi[i] !== num2Bi[i]) {
      res++;
    }
  }
  return res;
}

export function findTargetSumWays(nums: number[], target: number) {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b);
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) return 0;
  const dp = Array.from({ length: nums.length }, () =>
    new Array(diff / 2 + 1).fill(0)
  );
  dp[0][0] = 1;
  for (let i = 1; i <= nums.length; i++) {
    const current = nums[i - 1];
    for (let j = 0; j <= diff / 2; j++) {
      dp[i][j] = dp[i - 1][j];
      if (current <= j) {
        dp[i][j] += dp[i - 1][j - current];
      }
    }
  }
  return dp[nums.length][diff / 2];
}

// twoponinters 6-10
export function removeNthFromEnd(head: ListNode | null, n: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let current: ListNode | null = dummyHead;
  const stack: ListNode[] = [];
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
}

export function removeDuplicates(nums: number[]) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (i > 0 && nums[i - 1] === nums[i]) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    const current = nums[i];
    if (current === val) {
      res--;
      for (let j = 0; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function strStr(hayStack: string, needle: string) {
  if (!needle) return 0;
  let res = -1;
  let index = 0;
  while (index < hayStack.length) {
    const current = hayStack[index];
    if (hayStack.length - index < needle.length) break;
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < needle.length + index; i++) {
        if (hayStack[i] !== needle[i - index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = index;
        break;
      }
    }
    index++;
  }
  return res;
}

export function rotateRight(head: ListNode | null, k: number) {
  if (k === 0 || !head || !head.next) return;
  let count = 1;
  let current = head;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  k = count - (k % count);
  let prev = head;
  for (let i = 0; i < k - 1; k++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}
