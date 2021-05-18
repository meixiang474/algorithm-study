export default class CQueue {
  stack1: any[];
  stack2: any[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  appendTail(val: number) {
    this.stack1.push(val);
  }
  deleteHead() {
    if (this.stack1.length === 0) return -1;
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
    const res = this.stack2.pop();
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop());
    }
    return res;
  }
}
