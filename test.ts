import { Heap } from "./practice/week5/1.heap";
import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 32-I 32-II
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current.val);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return res;
}

export function levelOrder1(root: TreeNode | null) {
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

// heap
export class MinHeap<T = number> {
  heap: T[];
  constructor(compare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare || this.compare;
  }
  compare(a: T, b: T) {
    return a < b;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  insert(val: T) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }
  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }
  // todo
}

// hot 21 - 24
export function permute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!path.includes(nums[i])) {
        dfs(path.concat(nums[i]));
      }
    }
  };
  dfs([]);
  return res;
}

export function rotate(matrix: number[][]) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
}

export function groupAnagrams1(strs: string) {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const key = item.split("").sort().join("");
    const arr = map.get(key) || [];
    arr.push(item);
    if (!map.has(key)) map.set(key, arr);
  }
  const res: string[][] = [];
  for (let [, value] of map) {
    res.push(value);
  }
  return res;
}

export function maxSubarray(nums: number[]) {
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = dp[i - 1] > 0 ? dp[i - 1] + nums[i] : nums[i];
  }
  return Math.max(...dp);
}

// linkedlist 1-5
export function addTwo(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) p3.next = new ListNode(carry);
  return l3.next;
}

export function removeNthFromEnd(head: ListNode | null, n: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let current: ListNode | null = dummyHead;
  const stack: ListNode[] = [];
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev) prev.next = prev.next?.next || null;
  return dummyHead.next;
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return res.next;
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const merge = (
    lists: (ListNode | null)[],
    l: number,
    r: number
  ): ListNode | null => {
    if (l === r) return lists[l];
    if (l > r) return null;
    const mid = Math.floor(l + (r - l) / 2);
    return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r));
  };
  const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null) => {
    const res = new ListNode(-1);
    let p1 = l1,
      p2 = l2,
      p3 = res;
    while (p1 && p2) {
      if (p1.val > p2.val) {
        p3.next = p2;
        p2 = p2.next;
      } else {
        p3.next = p1;
        p1 = p1.next;
      }
      p3 = p3.next;
    }
    if (p1) p3.next = p1;
    if (p2) p3.next = p2;
    return res;
  };
  return merge(lists, 0, lists.length - 1);
}

export function swapPairs(head: ListNode | null) {
  if (!head || !head.next) return head;
  const newHead = head.next;
  const res = swapPairs(newHead.next);
  newHead.next = head;
  head.next = res;
  return newHead;
}
