// leetcode 641

export default class MyCircularDeque {
  data: (number | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(k: number) {
    this.data = new Array(k).fill(null);
    this.front = this.tail = this.size = 0;
  }
  insertFront(value: number) {
    if (this.size === this.data.length) return false;
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = value;
    this.size++;
    return true;
  }
  insertLast(value: number) {
    if (this.size === this.data.length) return false;
    this.data[this.tail] = value;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
    return true;
  }
  deleteFront() {
    if (this.size === 0) return false;
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    return true;
  }
  deleteLast() {
    if (this.size === 0) return false;
    this.tail = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    this.data[this.tail] = null;
    this.size--;
    return true;
  }
  getFront() {
    if (this.size === 0) return -1;
    return this.data[this.front];
  }
  getRear() {
    if (this.size === 0) return -1;
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index];
  }
  isEmpty() {
    return this.size === 0
  }
  isFull() {
    return this.size === this.data.length
  }
}
