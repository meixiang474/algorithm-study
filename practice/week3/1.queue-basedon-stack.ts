// 面试题 03 04

export default class MyQueue {
  stack1: number[];
  stack2: number[];

  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  push(x: number) {
    this.stack1.push(x);
  }

  pop() {
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
    const res = this.pop();
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    this.stack1.push(res);
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }

  empty() {
    return this.stack1.length === 0
  }
}
