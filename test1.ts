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

// offer 17 - 24
export function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 1; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export function deleteNode(head: ListNode | null, target: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === target) {
      prev.next = prev.next.next;
      break;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function exchange(nums: number[]) {
  let l = -1,
    i = 0,
    r = nums.length;
  const swap = (arr: number[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  while (i < r) {
    const current = nums[i];
    if (current % 2 !== 0) {
      l++;
      swap(nums, l, i);
      i++;
    } else {
      r--;
      swap(nums, r, i);
    }
  }
  return nums;
}

export function getKthFromEnd(head: ListNode | null, k: number) {
  const res: number[] = [];
  let current = head;
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res[res.length - k];
}

export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
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
    if (this.isEmpty()) throw new Error('error');
    return this.items.shift()!;
  }
  getFront() {
    if (this.isEmpty()) throw new Error('error');
    return this.items[0];
  }
  toString() {
    return this.items.toString();
  }
}

export class LoopQueue<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity: number = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length - 1;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail + this.data.length - this.front;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(val: T) {
    if (this.getSize() >= this.getCapacity())
      this.resize(2 * this.getCapacity());
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error('error');
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error('error');
    return this.data[this.front]!;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\nfront [`;
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ',';
    }
    res = res.slice(0, -1) + '] tail';
    return res;
  }
}

export class Deque<T> {
  data: (T | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity: number = 10) {
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
    this.tail = this.getSize();
    this.data = newData;
  }
  addLast(val: T) {
    if (this.getSize() >= this.getCapacity())
      this.resize(this.getCapacity() * 2);
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(val: T) {
    if (this.getSize() >= this.getCapacity())
      this.resize(2 * this.getCapacity());
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = val;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error('error');
    const res = this.data[this.front];
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
    if (this.isEmpty()) throw new Error('error');
    this.tail = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    const res = this.data[this.tail];
    this.data[this.tail] = null;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2)
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error('error');
    return this.data[this.front] as T;
  }
  getLast() {
    if (this.isEmpty()) throw new Error('error');
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index] as T;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${
      this.getCapacity
    }\r\nfront[`;
    for (let i = 0; i < this.getSize(); i++) {
      res += JSON.stringify(this.data[(this.front + i) % this.data.length]);
    }
    res += res.slice(0, -1) + '] tail';
    return res;
  }
}
