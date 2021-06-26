export class Queue<T = number> {
  items: T[];
  constructor() {
    this.items = [];
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.shift()!;
  }
  getFront() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[0];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
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
    this.front = 0;
    this.tail = 0;
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
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(e: T) {
    if (this.getSize() === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.getSize() === 0) throw new Error("error");
    const res = this.data[this.front]!;
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
    if (this.getSize() === 0) throw new Error("error");
    return this.data[this.front]!;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class Deque<T = number> {
  data: (T | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = 0;
    this.front = 0;
    this.tail = 0;
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
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
    this.data = newData;
  }
  addLast(e: T) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(e: T) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = e;
    this.size++;
  }
  removeFirst() {
    if (this.getSize() === 0) throw new Error("error");
    const res = this.data[this.front]!;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeLast() {
    if (this.size === 0) throw new Error("error");
    this.tail = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    const res = this.data[this.tail];
    this.data[this.tail] = null;
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.size === 0) throw new Error("error");
    return this.data[this.front]!;
  }
  getLast() {
    if (this.size === 0) throw new Error("error");
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index]!;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.size; i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class StackBasedOnQueue<T = number> {
  queue: T[];
  constructor() {
    this.queue = [];
  }
  push(item: T) {
    this.queue.push(item);
  }
  pop() {
    if (this.queue.length === 0) throw new Error("error");
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift()!;
  }
  peek() {
    if (this.queue.length === 0) throw new Error("error");
    const res = this.pop();
    this.push(res);
    return res;
  }
  getSize() {
    return this.queue.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
}

export class QueueBasedOnStack<T = number> {
  stack1: T[];
  stack2: T[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: T) {
    this.stack2.push(item);
  }
  dequeue() {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  getFront() {
    const res = this.dequeue();
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    this.stack1.push(res);
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  getSize() {
    return this.stack1.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
}

export const replaceSpace = (s: string) => s.replace(/\s/g, () => "%20");

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export const reversePrint = (head: ListNode | null) => {
  const reverse = (head: ListNode | null): ListNode | null => {
    if (!head || !head.next) return head;
    const res = reverse(head);
    head.next.next = head;
    head.next = null;
    return res;
  };
  const newHead = reverse(head);
  let current = newHead;
  const res: number[] = [];
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res;
};
