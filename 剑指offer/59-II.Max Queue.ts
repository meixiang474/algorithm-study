/**
 * @description 剑指offer 59-II
 */

export default class MaxQueue {
  queue: number[];
  items: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  enqueue(val: number) {
    this.items.push(val);
    while (this.queue.length !== 0 && this.queue[this.queue.length - 1] < val) {
      this.queue.pop();
    }
    this.queue.push(val);
  }
  dequeue() {
    if (this.items.length === 0) return -1;
    const res = this.items.shift()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  getMax() {
    if (this.items.length === 0) return -1;
    return this.queue[0];
  }
}
