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

export function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      dfs(p.left, q.right) &&
      dfs(p.right, q.left)
    ) {
      return true;
    }
    return false;
  };
  return dfs(root.left, root.right);
}

// linked list
export class ListNode<T = any> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList<T = any> {
  dummyHead: ListNode<T>;
  size: number;
  constructor() {
    this.dummyHead = new ListNode(-1 as any);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  add(index: number, val: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(val);
    prev.next.next = next;
    this.size++;
  }
  addFirst(val: T) {
    this.add(0, val);
  }
  addLast(val: T) {
    this.add(this.size, val);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current.val;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  set(index: number, val: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    current.val = val;
  }
  contains(val: T) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }
  remove(index: number) {
    if(index < 0 || index >= this.size) throw new Error('error')
  }
}

// leetcode binary search 6-10
export function kthSmallest(root: TreeNode | null, k: number) {
  if (!root) return null;
  let index = 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    index++;
    if (index === k) {
      res = node.val;
      return;
    }
    if (node.right) {
      dfs(node.right);
    }
  };
  dfs(root);
  return res;
}

export function findDuplicate(nums: number[]) {
  let l = 1,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) count++;
    }
    if (count <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

export function lengthOfLIS(nums: number[]) {
  if (nums.length === 0) return 0;
  const dp = [1];
  let res = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
}

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}

export function intersection2(nums1: number[], nums2: number[]) {
  const map = new Map<number, number>();
  for (let item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.has(item) && map.get(item)! > 0) {
      res.push(item);
      map.set(item, map.get(item)! - 1);
    }
  }
  return res;
}
