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
    return this.getNode(this.root, key) != null;
  }
  get(key: K) {
    const node = this.getNode(this.root, key);
    return node ? node.value : null;
  }
  set(key: K, value: V) {
    const node = this.getNode(this.root, key);
    if (!node) throw new Error("error");
    node.value = value;
  }
  minimumNode(node: BSTMapNode<K, V>): BSTMapNode<K, V> {
    if (!node.left) {
      return node;
    }
    return this.minimumNode(node.left);
  }
  removeMinNode(node: BSTMapNode<K, V>): BSTMapNode<K, V> | null {
    if (!node.left) {
      this.size--;
      return node.right;
    }
    node.left = this.removeMinNode(node.left);
    return node;
  }
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (!node) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: BSTMapNode<K, V> | null, key: K): BSTMapNode<K, V> | null {
    if (!node) {
      return null;
    }
    if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    if (this.compare(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (!node.left) {
      this.size--;
      return node.right;
    } else if (!node.right) {
      this.size--;
      return node.left;
    } else {
      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right);
      return successor;
    }
  }
}

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
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
      return [map.get(rest), i];
    }
    map.set(current, i);
  }
}

export function fn(s: string) {
  let res = 0;
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr) && map.get(currentr)! >= l) {
      l = map.get(currentr)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(currentr, r);
    r++;
  }
  return res;
}

export function fn1(s: string, t: string) {
  let res = "";
  const need = new Map<string, number>();
  for (let item of t) {
    need.set(item, need.has(item) ? need.get(item)! + 1 : 1);
  }
  let needType = need.size;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (need.has(currentr)) {
      need.set(currentr, need.get(currentr)! - 1);
      if (need.get(currentr) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentl = s[l];
      if (need.has(currentl)) {
        need.set(currentl, need.get(currentl)! + 1);
        if (need.get(currentl) === 1) needType++;
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

// leetcode sort 6-10

export function largestNumber(nums: number[]) {
  const res = nums
    .map((item) => item.toString())
    .sort((a, b) => parseInt(b + a) - parseInt(a + b))
    .join("");
  return res[0] === "0" ? "0" : res;
}

export function containsDuplicate(nums: number[], k: number, t: number) {
  const getId = (num: number) => {
    return num < 0
      ? Math.floor((num + 1) / (t + 1)) - 1
      : Math.floor(num / (t + 1));
  };
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const id = getId(current);
    if (map.has(id)) return true;
    if (map.has(id + 1) && Math.abs(nums[i] - map.get(id + 1)!) <= t)
      return true;
    if (map.has(id - 1) && Math.abs(nums[i] - map.get(id - 1)!) <= t)
      return true;
    map.set(id, nums[i]);
    if (i >= k) {
      map.delete(getId(nums[i - k]));
    }
  }
  return false
}

export function isAnagram(s: string, t: string) {
  const map = new Map<string, number>()
  for(let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1)
  }
  for(let item of t) {
    if(!map.has(item)) return false
    map.set(item, map.get(item)! - 1)
  }
  for(let [key, value] of map) {
    if(value !== 0) return false
  }
  return true
}