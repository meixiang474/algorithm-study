export {};
class Queue<T> {
  private items: T[];
  constructor() {
    this.items = [];
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  getFront() {
    return this.items[0];
  }
  toString() {
    return this.items.toString();
  }
}
