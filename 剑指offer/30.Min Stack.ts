export default class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    const res = this.items.pop() as number;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  min() {
    if (this.items.length === 0) throw new Error("error");
    return this.queue[0];
  }
}
