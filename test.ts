import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 32-III

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
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

// set

export function fn(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function fn1(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => !nums2.includes(item));
}

export class BSTSet<T = number> {
  bst: BST<T>;
  constructor() {
    this.bst = new BST();
  }
  getSize() {
    return this.bst.getSize();
  }
  isEmpty() {
    return this.bst.isEmpty();
  }
  add(e: T) {
    this.bst.add(e);
  }
  contains(e: T) {
    return this.bst.contains(e);
  }
  remove(e: T) {
    this.bst.remove(e);
  }
}

export class LinkedListSet<T = number> {
  list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList(-1 as any);
  }
  getSize() {
    return this.list.getSize();
  }
  isEmpty() {
    return this.list.isEmpty();
  }
  contains(e: T) {
    return this.list.contains(e);
  }
  add(e: T) {
    if (!this.list.contains(e)) {
      this.list.addFirst(e);
    }
  }
  remove(e: T) {
    this.list.removeElement(e);
  }
}

export function uniqueMorse(words: string[]) {
  const arr = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  const set = new Set<string>();
  for (let item of words) {
    set.add(
      item.split("").reduce((memo, current) => {
        return memo + arr[current.charCodeAt(0) - "a".charCodeAt(0)];
      }, "")
    );
  }
  return set.size;
}

// leetcode sliding-window 6-10
