export class MyArray<T = number> {
  data: T[];
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
    const newData: T[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, e: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size === this.getCapacity()) {
      this.resize(2 * this.data.length);
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = e;
    this.size++;
  }
  addFirst(e: T) {
    this.add(0, e);
  }
  addLast(e: T) {
    this.add(this.size, e);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index] as T;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return true;
    }
    return false;
  }
  find(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return i;
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
  removeElement(e: T) {
    const index = this.find(e);
    if (index !== -1) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, e: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = e;
  }
  toString() {
    let res = `Array: size=${this.size} capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}
