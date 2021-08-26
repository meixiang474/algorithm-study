// 31

export function validStack(pushed: number[], popped: number[]) {
  const stack = [];
  let index = 0;
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length > 0 && stack[stack.length - 1] === popped[index]) {
      index++;
      stack.pop();
    }
  }
  return stack.length === 0;
}

// search sort
export class MyArray<T> {
  data: (T | null)[];
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.data.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, item: T) {
    if (index < 0 || index > this.getSize()) throw new Error("error");
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.size++;
  }
  addFirst(item: T) {
    this.add(0, item);
  }
  addLast(item: T) {
    this.add(this.size, item);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index];
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(item: T) {
    for (let i = 0; i < this.size; i++) {
      if (item === this.data[i]) {
        return true;
      }
    }
    return false;
  }
  find(item: T) {
    for (let i = 0; i < this.size; i++) {
      if (item === this.data[i]) {
        return i;
      }
    }
    return -1;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(item: T) {
    const index = this.find(item);
    if (index !== -1) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, item: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = item;
  }
  toString() {
    let res = `MyArray: size=${this.size}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}
