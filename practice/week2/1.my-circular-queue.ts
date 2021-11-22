// leetcode 622

export default class MyCircularQueue {
  data: (number | null)[];
  front: number;
  tail: number;
  size: number;
  constructor(k: number) {
    this.data = new Array(k).fill(null);
    this.front = this.tail = this.size = 0;
  }
  Front() {
    if (this.size === 0) return -1;
    return this.data[this.front];
  }
  Rear() {
    if (this.size === 0) return -1;
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index];
  }
  enQueue(value: number) {
    if (this.size === this.data.length) return false;
    this.data[this.tail] = value;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
    return true;
  }
  deQueue() {
    if (this.size === 0) return false;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    return true;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.data.length;
  }
}
