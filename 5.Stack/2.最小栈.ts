// 155
class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }

  push(x: number): void {
    this.items.push(x);
    if (x <= this.queue[0] || this.queue.length === 0) {
      this.queue.unshift(x);
    }
  }

  pop(): void {
    const res = this.items.pop();
    if (res === this.queue[0]) {
      this.queue.shift();
    }
  }

  top(): number {
    return this.items[this.items.length - 1];
  }

  min(): number {
    return this.queue[0];
  }
}
