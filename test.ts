// offer 6
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function reversePrint(head: ListNode | null) {
  const res: number[] = [];
  let current = head;
  while (current) {
    res.unshift(current.val);
    current = current.next;
  }
  return res;
}

// queue
export class Queue {
  items: number[];
  constructor() {
    this.items = [];
  }
  enqueue(item: number) {
    this.items.push(item);
  }
  dequeue() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.shift()!;
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  getFront() {
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
      : this.tail + this.data.length - this.front;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(item: T) {
    if (this.getSize() === this.getCapacity()) {
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
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\nfront [`;
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + 1) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class Deque<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.front = this.tail = this.size = 0;
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
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
    this.data = newData;
  }
  addLast(item: T) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(item: T) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = item;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res as T;
  }
  removeLast() {
    if (this.isEmpty()) throw new Error("error");
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
    return res as T;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index] as T;
  }
  toString() {
    let res = `Deque: size=${
      this.size
    }, capacity=${this.getCapacity()}\r\nfront [`;
    for (let i = 0; i < this.size; i++) {
      res +=
        JSON.stringify(this.data[(i + this.front) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}
