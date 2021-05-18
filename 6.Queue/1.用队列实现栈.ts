// 225
export {};
class Stack<T> {
  private queue: T[];
  constructor() {
    this.queue = [];
  }
  getSize() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  push(e: T) {
    this.queue.push(e);
  }
  pop() {
    if (this.isEmpty()) throw new Error('error');
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift();
  }
  peek() {
    if (this.isEmpty()) throw new Error('error');
    const res = this.pop();
    this.push(res!);
    return res;
  }
}
