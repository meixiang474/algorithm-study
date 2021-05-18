class Deque<T> {
  private data: (T | null)[];
  private front: number;
  private tail: number;
  private size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.front = 0;
    this.tail = 0;
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
    const newData = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[0] = this.data[(this.front + i) / this.data.length];
    }
    this.front = 0;
    this.tail = this.size;
    this.data = newData;
  }
  addLast(e: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(e: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front === 0 ? this.data.length - 1 : this.front - 1;
    this.data[this.front] = e;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res as T;
  }
  removeLast() {
    if (this.isEmpty()) throw new Error("error");
    this.tail = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    const res = this.data[this.tail];
    this.data[this.tail] = null;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res as T;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front] as T;
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail === 0 ? this.data.length - 1 : this.tail - 1;
    return this.data[index] as T;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}
