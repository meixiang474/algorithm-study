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

export class ListNode1 {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 68-II 3
export function lowestCommon(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  let res = null;
  const dfs = (
    node: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
  ): boolean => {
    if (!node || !p || !q) return false;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    if (
      (left && right) ||
      ((node.val === p.val || node.val === q.val) && (left || right))
    )
      res = node;
    return left || right || node.val === p.val || node.val === q.val;
  };
  dfs(root, p, q);
  return res;
}

// todo

// fenzhi donggui tanxin huisu
export function invertTree(root: TreeNode | null) {
  if (!root) return null;
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

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  )
    return true;
  return false;
}

export function isSymmetic(root: TreeNode | null) {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p || !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.left)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
}

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[nums.length];
}

export function rob1(nums: number[]) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

export function findContentChildren(g: number[], s: number[]) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= g[res]) {
      res++;
    }
  }
  return res;
}

export function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i];
    }
  }
  return profit;
}

export function permute(nums: number[]) {
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue;
      dfs(path.concat(nums[i]));
    }
  };
  const res: number[][] = [];
  dfs([]);
  return res;
}

export function subsets(nums: number[]) {
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  const res: number[][] = [];
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

// hot 65-68
export function invertTree1(root: TreeNode | null) {
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

export function isPalindrome(head: ListNode | null) {
  if (!head || !head.next) return true;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast) {
    slow = slow!.next;
  }
  let prev: ListNode | null = null;
  let current = slow;
  while (current) {
    const temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }
  let p1: ListNode | null = head;
  let p2 = prev;
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  let res = null;
  const dfs = (
    node: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
  ): boolean => {
    if (!node || !p || !q) return false;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    if (
      (left && right) ||
      ((node.val === p.val || node.val === q.val) && (left || right))
    ) {
      res = node;
    }
    return left || right || node.val === p.val || node.val === q.val;
  };
  dfs(root, p, q);
  return res;
}

export function productExceptionSelf(nums: number[]) {
  const res: number[] = [];
  res[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    res[i] = nums[i - 1] * res[i - 1];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }
  return res;
}

// linkedlist 6-10
export function rotateRight(head: ListNode | null, k: number) {
  if (k === 0 || !head || !head.next) return head;
  let count = 1;
  let current = head;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  k = count - (k % count);
  let prev = head;
  for (let i = 0; i < k - 1; i++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}

export function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = deleteDuplicates(head.next);
  if (res && res.val === head.val) {
    return res.next;
  } else if (head.val === head.next.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function deleteDuplicates1(head: ListNode | null) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev && prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function partition(head: ListNode | null, x: number) {
  const minHead = new ListNode(-1);
  const maxHead = new ListNode(-1);
  let current = head;
  let p1 = minHead;
  let p2 = maxHead;
  while (current) {
    if (current.val < x) {
      p1.next = current;
      p1 = p1.next;
    } else {
      p2.next = current;
      p2 = p2.next;
    }
    current = current.next;
  }
  p2.next = null;
  p1.next = maxHead.next;
  return minHead.next;
}

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
) {
  if (!head || !head.next) return head;
  let index = 0;
  let leftNode: ListNode | null = null,
    rightNode: ListNode | null = null,
    nextNode: ListNode | null = null,
    prevNode: ListNode | null = null;
  let current = head;
  while (current) {
    if (index === left - 2) {
      prevNode = current;
    } else if (index === left - 1) {
      leftNode = current;
    } else if (index === right - 1) {
      rightNode = current;
      nextNode = current.next;
    }
  }
  let prev: ListNode | null = null;
  let reverseCurrent = leftNode;
  while (reverseCurrent) {
    const temp = reverseCurrent.next;
    reverseCurrent.next = prev;
    prev = reverseCurrent;
    reverseCurrent = temp;
  }
  if (prevNode) {
    prevNode.next = prev;
  } else {
    head = prev;
  }
  if (prev) {
    prev.next = nextNode;
  }
  return head;
}
