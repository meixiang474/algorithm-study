export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

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

// offer 51 52
export function reversePairs(nums: number[]) {
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] > temp[j]) {
        res += mid - i + 1;
        arr[k] = temp[j];
        j++;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  let res = 0;
  sortArr([...nums], 0, nums.length - 1, [...nums]);
  return res;
}

export function getIntersectionNode(l1: ListNode | null, l2: ListNode | null) {
  if (!l1 || !l2) return null;
  let p1: ListNode | null = l1;
  let p2: ListNode | null = l2;
  while (p1 !== p2) {
    p1 = p1 ? p1.next : l2;
    p2 = p2 ? p2.next : l1;
  }
  return p1;
}

// queue
export class Queue<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  enqueue(item: T) {
    this.items.push(item);
  }
  dequeue() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.shift()!;
  }
  getFront() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[0];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  toString() {
    return this.items.toString();
  }
}

export class LoopQueue<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1).fill(null);
    this.front = this.tail = 0;
  }
  getCapacity() {
    return this.data.length - 1;
  }
  getSize() {
    return this.tail >= this.front
      ? this.tail - this.front
      : this.tail - this.front + this.data.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity + 1).fill(null);
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.tail = this.getSize();
    this.front = 0;
    this.data = newData;
  }
  enqueue(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front]!;
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
    return this.data[this.front]!;
  }
  toString() {
    let res = `LoopQueue: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(this.front + i) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class Deque<T> {
  data: (T | null)[];
  front: number;
  tail: number;
  size: number;
  constructor(capacity = 10) {
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
    for (let i = 0; i < this.getSize(); i++) {
      newData[i] = this.data[(this.front + i) % this.data.length];
    }
    this.front = 0;
    this.tail = this.getSize();
    this.data = newData;
  }
  addLast(item: T) {
    if (this.getSize() >= this.getCapacity())
      this.resize(this.getCapacity() * 2);
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }
  addFront(item: T) {
    if (this.getSize() >= this.getCapacity()) {
      this.resize(this.getCapacity() * 2);
    }
    this.front = this.front > 0 ? this.front - 1 : this.data.length - 1;
    this.data[this.front] = item;
    this.size++;
  }
  removeFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.data[this.front];
    this.data[this.front] = null;
    this.size--;
    this.front = (this.front + 1) % this.data.length;
    if (
      this.getSize() <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
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
    return this.data[this.front]!;
  }
  getLast() {
    if (this.isEmpty()) throw new Error("error");
    const index = this.tail > 0 ? this.tail - 1 : this.data.length - 1;
    return this.data[index]!;
  }
  toString() {
    let res = `Deque: size=${this.getSize()}, capacity=${this.getCapacity()}\r\n`;
    res += "front [";
    for (let i = 0; i < this.getSize(); i++) {
      res +=
        JSON.stringify(this.data[(i + this.front) % this.data.length]) + ",";
    }
    res = res.slice(0, -1) + "] tail";
    return res;
  }
}

export class StackBasedOnQueue<T = number> {
  queue: T[];
  constructor() {
    this.queue = [];
  }
  getSize() {
    return this.queue.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: T) {
    this.queue.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    for (let i = 0; i < this.getSize() - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift()!;
  }
  peek() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.pop();
    this.push(res);
    return res;
  }
}

export class QueueBasedOnStack<T = number> {
  stack1: T[];
  stack2: T[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  getSize() {
    return this.stack1.length;
  }
  isEmpty() {
    return this.stack1.length === 0;
  }
  enqueue(item: T) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.dequeue();
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    this.stack1.push(res);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

// hot 29-32
export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function minDistance(word1: string, word2: string) {
  const m = word1.length;
  const n = word2.length;
  if (m * n === 0) return m + n;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const leftAdd = dp[i][j - 1] + 1;
      const rightAdd = dp[i - 1][j] + 1;
      let leftChange = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) leftChange += 1;
      dp[i][j] = Math.min(leftAdd, rightAdd, leftChange);
    }
  }
  return dp[m][n];
}

export function sortColors(nums: number[]) {
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  let l = -1,
    r = nums.length;
  let i = 0;
  while (i < r) {
    if (nums[i] === 0) {
      l++;
      swap(nums, i, l);
      i++;
    } else if (nums[i] === 2) {
      r--;
      swap(nums, i, r);
    } else {
      i++;
    }
  }
}

export function minWindow(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let needType = map.size;
  let res = "";
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr)) {
      map.set(currentr, map.get(currentr)! - 1);
      if (map.get(currentr) === 0) {
        needType -= 1;
      }
    }

    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentl = s[l];
      if (map.has(currentl)) {
        map.set(currentl, map.get(currentl)! + 1);
        if (map.get(currentl) === 1) {
          needType += 1;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}

// practice week4
export class GraphNode {
  val: number;
  children: GraphNode[];
  constructor(val: number) {
    this.val = val;
    this.children = [];
  }
}

export function preorder(root: GraphNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: GraphNode) => {
    res.push(node.val);
    node.children.forEach((item) => {
      dfs(item);
    });
  };
  dfs(root);
  return res;
}

export function invertTree(root: TreeNode | null) {
  if (!root) return root;
  const dfs = (node: TreeNode) => {
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return root;
}

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function levelOrderBottom(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  let currentLevel = -1;
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (currentLevel === level) {
      const arr = res[0];
      arr.push(current.val);
    } else {
      const arr = [];
      arr.push(current.val);
      res.unshift(arr);
      currentLevel = level;
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function zigzagLevelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}
