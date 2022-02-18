import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 13
export function movingCount(m: number, n: number, k: number) {
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !map[nextR][nextC]
      ) {
        const sum =
          nextR
            .toString()
            .split("")
            .map((i) => parseInt(i))
            .reduce((a, b) => a + b) +
          nextC
            .toString()
            .split("")
            .map((i) => parseInt(i))
            .reduce((a, b) => a + b);
        if (sum <= k) {
          dfs(nextR, nextC);
        }
      }
    });
  };
  dfs(0, 0);
  return res;
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
    this.dummyHead = new LinkedListMapNode();
    this.size = 0;
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
    if (node == null) throw new Error("error");
    node.value = value;
  }
  remove(key: K) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.key === key) break;
      prev = prev.next;
    }
    if (prev.next) {
      const node = prev.next;
      prev.next = node.next;
      this.size--;
      return node.value;
    }
    return null;
  }
}

export class BSTMapNode<K = number, V = any> {
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

export class BSTMap<K = number, V = any> {
  root: BSTMapNode<K, V> | null;
  size: number;
  constructor(compare?: (a: K, b: K) => boolean) {
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
  addNode(key: K, value: V, node: BSTMapNode<K, V> | null) {
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
    } else {
      return node;
    }
  }
  contains(key: K) {
    return this.getNode(this.root, key) != null;
  }
  get(key: K) {
    const node = this.getNode(this.root, key);
    return node == null ? null : node.value;
  }
  set(key: K, value: V) {
    const node = this.getNode(this.root, key);
    if (node == null) {
      throw new Error("error");
    }
    node.value = value;
  }
  minimumNode(node: BSTMapNode<K, V>): BSTMapNode<K, V> {
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  removeMinNode(node: BSTMapNode<K, V>) {
    if (!node.left) {
      this.size--;
      return node.right;
    }
    node.left = this.removeMinNode(node.left);
    return node;
  }
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (node == null) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: BSTMapNode<K, V> | null, key: K) {
    if (!node) return null;
    if (this.compare(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (!node.left) {
        this.size--;
        return node.right;
      }
      if (!node.right) {
        this.size--;
        return node.left;
      }
      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right);
      return successor;
    }
  }
}

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, true>();
  const res: number[] = [];
  for (let item of nums1) {
    map.set(item, true);
  }
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}

export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function fn(nums: number[]) {
  let res = 0;
  let l = 0,
    r = 0;
  const map = new Map<number, number>();
  while (r < nums.length) {
    const current = nums[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function fn1(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let needType = map.size;
  let res = "";
  let l = 0,
    r = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current)) {
      map.set(current, map.get(current)! - 1);
      if (map.get(current) === 0) {
        needType--;
      }
    }
    while (!needType) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentl = s[l];
      if (map.has(currentl)) {
        map.set(currentl, map.get(currentl)! + 1);
        if (map.get(currentl) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}

export function intersectionTwo(nums1: number[], nums2: number[]) {
  const map = new Map<number, number>();
  const res: number[] = [];
  for (let item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.set(item, map.get(item)! - 1);
      if (map.get(item) === 0) {
        map.delete(item);
      }
    }
  }
  return res;
}

// hashtable 1 - 5
export function twoSum1(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && nums[i - 1] === current) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (j > i + 1 && nums[j - 1] === currentj) continue;
      if (current + currentj + nums[j + 1] + nums[j + 2] > target) break;
      if (
        current + currentj + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const currentl = nums[l];
        const currentr = nums[r];
        const sum = current + currentj + currentl + currentr;
        if (sum === target) {
          res.push([current, currentj, currentl, currentr]);
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        }
      }
    }
  }
  return res;
}
