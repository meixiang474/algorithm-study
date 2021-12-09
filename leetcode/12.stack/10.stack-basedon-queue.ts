// leetcode 255

export default class MyStack {
  items: number[];
  constructor() {
    this.items = [];
  }
  push(item: number) {
    this.items.push(item);
    for (let i = 0; i < this.items.length - 1; i++) {
      this.items.push(this.items.shift()!);
    }
  }
  pop() {
    return this.items.shift();
  }
  top() {
    return this.items[0];
  }
  empty() {
    return this.items.length === 0;
  }
}
