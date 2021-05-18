export {};
class Stack<T> {
  private items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error('error');
    return this.items.pop();
  }
  peek() {
    if (this.items.length === 0) throw new Error('error');
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toString() {
    return this.items.toString();
  }
}
