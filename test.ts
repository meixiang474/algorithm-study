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
  remove(item: number) {
    this.root = this.removeNode(this.root, item);
  }
  removeNode(node: TreeNode | null, item: number): TreeNode | null {
    if (!node) return node;
    if (node.val > item) {
      node.left = this.removeNode(node.left, item);
      return node;
    }
    if (node.val < item) {
      node.right = this.removeNode(node.right, item);
      return node;
    }
    if (!node.left) {
      this.size--;
      return node.right;
    } else if (!node.right) {
      this.size--;
      return node.left;
    } else {
      const successor = this.maximumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right).next;
      return successor;
    }
  }
}

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  return res;
}

export function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
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

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  return res;
}

export function inorderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}

export function hasPathSum(root: TreeNode | null, sum: number) {
  if (!root) return false;
  let res = false;
  const dfs = (node: TreeNode, s: number) => {
    if (!node.left && !node.right && s === sum) {
      res = true;
      return;
    }
    if (node.left) dfs(node.left, node.left.val + s);
    if (node.right) dfs(node.right, node.right.val);
  };
  dfs(root, root.val);
  return res;
}

export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

// hot 49 - 52
export function wordBreak(s: string, wordDict: string[]) {
  const dp = [true];
  for (let i = 1; i <= s.length; i++) {
    dp[i] = false;
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

export function hasCycle(head: ListNode | null) {
  if (!head) return false;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

export function detectCycle(head: ListNode | null) {
  if (!head) return null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  let hasCycle = false;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }
  if (!hasCycle) return null;
  let res: ListNode | null = head;
  while (res && slow) {
    if (res === slow) {
      return res;
    }
    res = res.next;
    slow = slow.next;
  }
}

// todo

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
