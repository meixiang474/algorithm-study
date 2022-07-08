// leetcode 155

export default class MinStack {
  stack: number[];
  queue: number[];
  constructor() {
    this.stack = [];
    this.queue = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.stack.length === 0) return;
    const res = this.stack.pop();
    if (res === this.queue[0]) {
      this.queue.shift();
    }
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.queue[0];
  }
}
