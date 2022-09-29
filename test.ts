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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 57 58-I
export function twoSum(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) {
      return [nums[l], nums[r]];
    }
    if (sum > target) {
      r--;
    } else {
      l++;
    }
  }
  return [];
}

export function reverseWords(s: string) {
  const res: string[] = [];
  s = s.trim();
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== " ") {
      let j = i;
      while (s[j] !== " " && j >= 0) {
        j--;
      }
      res.push(s.slice(j + 1, i + 1));
      i = j;
    }
  }
  return res.join(" ");
}

// bst
interface Visitor {
  visit: (v: number) => void;
}

export class BST {
  root: TreeNode | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(item: number) {
    this.root = this.addNode(this.root, item);
  }
  addNode(node: TreeNode | null, item: number) {
    if (!node) {
      this.size++;
      return new TreeNode(item);
    }
    if (node.val === item) return node;
    if (node.val < item) {
      node.right = this.addNode(node.right, item);
    } else {
      node.left = this.addNode(node.left, item);
    }
    return node;
  }
  contains(item: number) {
    return this.containsNode(this.root, item);
  }
  containsNode(node: TreeNode | null, item: number): boolean {
    if (!node) return false;
    if (node.val === item) return true;
    if (node.val < item) return this.containsNode(node.right, item);
    return this.containsNode(node.left, item);
  }
  preOrder(visitor: Visitor) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      visitor.visit(node.val);
      this.preOrderNode(node.left, visitor);
      this.preOrderNode(node.right, visitor);
    }
  }
  inOrder(visitor: Visitor) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      this.inOrderNode(node.left, visitor);
      visitor.visit(node.val);
      this.inOrderNode(node.right, visitor);
    }
  }
  postOrder(visitor: Visitor) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      this.postOrderNode(node.left, visitor);
      this.postOrderNode(node.right, visitor);
      visitor.visit(node.val);
    }
  }
  preOrderNR(visitor: Visitor) {
    if (!this.root) return;
    const stack: TreeNode[] = [this.root];
    while (stack.length) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor) {
    if (!this.root) return;
    const queue: TreeNode[] = [this.root];
    while (queue.length) {
      const current = queue.shift()!;
      visitor.visit(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  minimum() {
    if (!this.root) throw new Error("error");
    return this.minimumNode(this.root);
  }
  minimumNode(node: TreeNode): TreeNode {
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  maximum() {
    if (!this.root) throw new Error("error");
    return this.maximumNode(this.root);
  }
  maximumNode(node: TreeNode): TreeNode {
    if (!node.right) return node;
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMinNode(this.root);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode): { res: number; next: TreeNode | null } {
    if (!node.left) {
      const res = node.val;
      this.size--;
      return {
        res,
        next: node.right,
      };
    }
    const { res, next } = this.removeMinNode(node.left);
    node.left = next;
    return {
      res,
      next: node,
    };
  }
  removeMax() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMaxNode(this.root);
    this.root = next;
    return res;
  }
  removeMaxNode(node: TreeNode): { res: number; next: TreeNode | null } {
    if (!node.right) {
      this.size--;
      const res = node.val;
      return {
        res,
        next: node.left,
      };
    }
    const { res, next } = this.removeMaxNode(node.right);
    node.right = next;
    return {
      res,
      next: node,
    };
  }
  remove() {
    // toto
  }
}

// hot 45 - 48
export function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i];
    }
  }
  return profit;
}

export function maxPathSum(root: TreeNode | null) {
  if (!root) return 0;
  let res = -Infinity;
  const dfs = (node: TreeNode): number => {
    const left = Math.max(node.left ? dfs(node.left) : 0, 0);
    const right = Math.max(node.right ? dfs(node.right) : 0, 0);
    res = Math.max(node.val + left + right, res);
    return Math.max(left, right) + node.val;
  };
  dfs(root);
  return res;
}

export function longestConsecutive(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    set.add(item);
  }
  let res = 0;
  for (let item of nums) {
    if (!set.has(item - 1)) {
      let current = item;
      let length = 1;
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      res = Math.max(res, length);
    }
  }
  return res;
}

export function singleNumber1(nums: number[]) {
  let res = 0;
  for (let item of nums) {
    res ^= item;
  }
  return res;
}

// binarySearch 6-10
export function kthSmallest(root: TreeNode | null, k: number) {
  if (!root) return 0;
  let index = 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    if (index >= k) return;
    index++;
    if (index === k) {
      res = node.val;
      return;
    }
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export function findDuplicate(nums: number[]) {
  let l = 1,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    let cnt = 0;
    for (let item of nums) {
      if (item <= mid) cnt++;
    }
    if (cnt <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

export function lengthOfLIS(nums: number[]) {
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
  const set = new Set<number>();
  for (let item of nums1) {
    set.add(item);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (set.has(item)) {
      res.push(item);
      set.delete(item);
    }
  }
  return res;
}

export function intersect(nums1: number[], nums2: number[]) {
  const map = new Map<number, number>();
  for (let item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.get(item)! > 0) {
      res.push(item);
      map.set(item, map.get(item)! - 1);
    }
  }
  return res;
}
