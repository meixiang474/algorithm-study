// offer 27
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function mirrorTree(root: TreeNode | null) {
  if (!root) return null;
  const res = new TreeNode(root.val);
  const dfs = (node: TreeNode, newNode: TreeNode) => {
    if (node.left) {
      newNode.right = new TreeNode(node.left.val);
      dfs(node.left, newNode.right);
    }
    if (node.right) {
      newNode.left = new TreeNode(node.right.val);
      dfs(node.right, newNode.left);
    }
  };
  dfs(root, res);
  return res;
}
// queue
export class Queue {
  items: number[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  enqueue(item: number) {
    this.items.push(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    return this.items.shift()!;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[0];
  }
  toString() {
    return this.items.toString();
  }
}

export class LoopQueue<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity: number = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = this.tail = 0;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail + this.data.length - this.front;
  }
  getCapacity() {
    return this.data.length - 1;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front];
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(i + this.front) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class Deque<T> {
  data: (T | null)[];
  size: number;
  front: number;
  tail: number;
  constructor(capacity: number = 10) {
    this.data = new Array(capacity).fill(null);
    this.front = this.tail = this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.tail = this.size;
    this.front = 0;
    this.data = newData;
  }
  addLast(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.data[this.tail] = item;
    this.tail = (1 + this.tail) % this.data.length;
    this.size++;
  }
  addFront(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(2 * this.getCapacity());
    }
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = item;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.front = (1 + this.front) % this.data.length;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res!;
  }
  removeLast() {
    if (this.isEmpty()) throw new Error("error");
    this.tail = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    const res = this.data[this.tail];
    this.data[this.tail] = null;
    this.size--;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    return this.data[this.front];
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index];
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res += JSON.stringify(this.data[i + this.front]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

// leetcode backtracking 6-10
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (nums.length - index + path.length < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function exist(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    map[r][c] = true;
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index] &&
        !map[nextR][nextC]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    map[r][c] = false;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
}

export function subsetsWithDup(nums: number[]) {
  const res: number[][] = [];
  nums.sort((a, b) => a - b);
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length >= length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue;
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function restoreIpAddresses(s: string) {
  const ips: string[] = [];
  const res: string[] = [];
  const dfs = (index: number) => {
    if (ips.length === 4 && index === s.length) {
      res.push(ips.join("."));
    }
    if (index === s.length) return;
    if (s[index] === "0") {
      ips.push(s[index]);
      dfs(index + 1);
      ips.pop();
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      item = item * 10 + parseInt(s[i]);
      if (item > 0 && item <= 255) {
        ips.push(item.toString());
        dfs(i + 1);
        ips.pop();
      } else {
        break;
      }
    }
  };
  dfs(0);
  return res;
}
