// 32-II

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

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    let arr = res[level];
    if (!arr) {
      arr = res[level] = [];
    }
    arr.push(current.val);
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
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
  getFront() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[0];
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

export class LoopQueue<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = 0;
    this.tail = 0;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail + this.data.length - this.front;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  getCapacity() {
    return this.data.length - 1;
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
  enqueue(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
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
    return this.data[this.front]!;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(i + this.front) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class Deque<T> {
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
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
    this.data = newData;
  }
  addLast(item: T) {
    if (this.size >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFirst(item: T) {
    if (this.size >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.front = this.front === 0 ? this.data.length - 1 : this.front - 1;
    this.data[this.front] = item;
    this.size++;
  }
  removeFront() {
    if (this.size === 0) throw new Error("error");
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
    return res;
  }
  removeLast() {
    if (this.size === 0) throw new Error("error");
    this.tail = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
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
  getFirst() {
    if (this.size === 0) throw new Error("error");
    return this.data[this.front]!;
  }
  getLast() {
    if (this.size === 0) throw new Error("error");
    const index = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    return this.data[index]!;
  }
  toString() {
    let res = `Deque: size=${this.size}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.size; i++) {
      res +=
        JSON.stringify(this.data[(i + this.front) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class StackBasedOnQueue {
  items: number[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    for (let i = 0; i < this.items.length - 1; i++) {
      this.items.push(this.items.shift()!);
    }
    return this.items.shift()!;
  }
  peek() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.pop();
    this.push(res);
    return res;
  }
}

export class QueueBasedOnStack {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: number) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.stack1.length === 0) throw new Error("error");
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  peek() {
    if (this.stack1.length === 0) throw new Error("error");
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
