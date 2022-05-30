import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 33

export function verifyPostorder(postorder: number[]): boolean {
  if (postorder.length === 0 || postorder.length === 1) return true;
  const upper = (data: number[], target: number) => {
    let l = 0,
      r = data.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (data[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const isTree = (postorder: number[], rootVal: number, rightIndex: number) => {
    const left = postorder.slice(0, rightIndex);
    const right = postorder.slice(rightIndex, -1);
    return (
      left.every((item) => item < rootVal) &&
      right.every((item) => item > rootVal)
    );
  };
  const rightIndex = upper(
    postorder.slice(0, -1),
    postorder[postorder.length - 1]
  );
  const flag = isTree(postorder, postorder[postorder.length - 1], rightIndex);
  if (flag) {
    return (
      verifyPostorder(postorder.slice(0, rightIndex)) &&
      verifyPostorder(postorder.slice(rightIndex, -1))
    );
  }
  return false;
}

// map
export class LinkedListMapNode<K = string, V = any> {
  key: K | null;
  value: V | null;
  next: LinkedListMapNode<K, V> | null;
  constructor(
    key: K | null = null,
    value: V | null = null,
    next: LinkedListMapNode<K, V> | null = null
  ) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
  toString() {
    return `${JSON.stringify(this.key)} : ${JSON.stringify(this.value)}`;
  }
}

export class LinkedListMap<K = string, V = any> {
  dummyHead: LinkedListMapNode<K, V>;
  size: number;
  constructor() {
    this.size = 0;
    this.dummyHead = new LinkedListMapNode();
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  getNode(key: K) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  contains(key: K) {
    return this.getNode(key) != null;
  }
  get(key: K) {
    const node = this.getNode(key);
    return node == null ? null : node.value;
  }
  add(key: K, value: V) {
    const node = this.getNode(key);
    if (node == null) {
      this.dummyHead.next = new LinkedListMapNode(
        key,
        value,
        this.dummyHead.next
      );
      this.size++;
    } else {
      node.value = value;
    }
  }
  set(key: K, value: V) {
    const node = this.getNode(key);
    if (!node) throw new Error("error");
    node.value = value;
  }
  remove(key: K) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.key === key) {
        break;
      }
      prev = prev.next;
    }
    if (prev.next) {
      const node = prev.next;
      this.size--;
      prev.next = node.next;
      return node.value;
    }
    return null;
  }
}

export class BSTMapNode<K = string, V = any> {
  key: K;
  value: V;
  left: BSTMapNode<K, V> | null;
  right: BSTMapNode<K, V> | null;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BSTMap<K = string, V = any> {
  root: BSTMapNode<K, V> | null;
  size: number;
  constructor(compare: (a: K, b: K) => boolean) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  compare(a: K, b: K) {
    return a < b;
  }
  add(key: K, value: V) {
    this.root = this.addNode(key, value, this.root);
  }
  addNode(key: K, value: V, node: BSTMapNode<K, V> | null): BSTMapNode<K, V> {
    if (!node) {
      this.size++;
      return new BSTMapNode(key, value);
    }
    if (this.compare(key, node.key)) {
      node.left = this.addNode(key, value, node.left);
    } else if (this.compare(node.key, key)) {
      node.right = this.addNode(key, value, node.right);
    } else {
      node.value = value;
    }
    return node;
  }
  getNode(node: BSTMapNode<K, V> | null, key: K): BSTMapNode<K, V> | null {
    if (!node) return null;
    if (this.compare(node.key, key)) {
      return this.getNode(node.right, key);
    } else if (this.compare(key, node.key)) {
      return this.getNode(node.left, key);
    }
    return node;
  }
  contains(key: K) {
    return this.getNode(this.root, key) != null
  }
}

// leetcode sliding-window 6-7

export function moveStones(nums: number[]) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const max =
    nums[n - 1] -
    nums[0] +
    1 -
    n -
    Math.min(nums[n - 1] - nums[n - 2] - 1, nums[1] - nums[0] - 1);
  let min = Infinity;
  let r = 0;
  for (let l = 0; l < n; l++) {
    while (r + 1 < n && nums[r + 1] - nums[l] + 1 <= n) {
      r++;
    }
    let res = n - r + l - 1;
    if (r - l + 1 === n - 1 && nums[r] - nums[l] + 1 === n - 1) {
      res = 2;
    }
    min = Math.min(res, min);
  }
  return [min, max];
}

export function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
) {
  let base = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) base += customers[i];
  }
  let increase = 0;
  for (let i = 0; i < minutes; i++) {
    increase += customers[i] * grumpy[i];
  }
  let maxIncrease = increase;
  for (let i = minutes; i < customers.length; i++) {
    increase =
      increase -
      customers[i - minutes] * grumpy[i - minutes] +
      customers[i] * grumpy[i];
    maxIncrease = Math.max(maxIncrease, increase);
  }
  return base + maxIncrease;
}
