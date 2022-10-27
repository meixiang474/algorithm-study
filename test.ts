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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 60 61
export function dicesProbability(n: number) {
  if (n === 0) return [];
  const dp = new Array(6).fill(1 / 6);
  for (let i = 2; i <= n; i++) {
    const temp: number[] = [];
    for (let j = 1; j <= 6; j++) {
      for (let k = 0; k < dp.length; k++) {
        const sum = k + j - 1;
        temp[sum] = (temp[sum] || 0) + dp[k] * (1 / 6);
      }
    }
  }
  return dp;
}

export function isStraight(nums: number[]) {
  const set = new Set<number>();
  let max = 0;
  let min = 14;
  for (let item of nums) {
    if (item === 0) continue;
    if (set.has(item)) return false;
    max = Math.max(max, item);
    min = Math.min(min, item);
    set.add(item);
  }
  return max - min < 5;
}

// graph
export function bfs(
  graph: Record<number, number[]>,
  node: number,
  visited: Set<number>
) {
  const res: number[] = [];
  const queue: number[] = [node];
  visited.add(node);
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
      }
    });
  }
  return res;
}

export function dfs(
  graph: Record<number, number[]>,
  node: number,
  visited: Set<number>
) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, item, visited);
    }
  });
}

export function waterFlow(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const flow1: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const flow2: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, flow: boolean[][]) => {
    flow[r][c] = true;
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
        !flow[nextR][nextC] &&
        matrix[nextR][nextC] >= matrix[r][c]
      ) {
        dfs(nextR, nextC, flow);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    dfs(r, 0, flow1);
    dfs(r, n - 1, flow2);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }
  const res: [number, number][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) res.push([r, c]);
    }
  }
  return res;
}

export function cloneGraph() {
  // todo
}

// hot 53 - 56
export function sortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const next = slow!.next;
  slow!.next = null;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const dummyHead = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = dummyHead;
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
  return dummyHead.next;
}

export function maxProduct(nums: number[]) {
  const max = [nums[0]];
  const min = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    max[i] = Math.max(nums[i] * max[i - 1], nums[i] * min[i - 1], nums[i]);
    min[i] = Math.min(nums[i] * min[i - 1], nums[i] * max[i - 1], nums[i]);
  }
  return Math.max(...max);
}

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    const item = this.items.pop();
    if (item === this.queue[0]) this.queue.shift();
    return item;
  }
  getMin() {
    return this.queue[0];
  }
  top() {
    return this.items[this.items.length - 1];
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  let p1 = headA;
  let p2 = headB;
  while (p1 !== p2) {
    p1 = p1 ? p1.next : headB;
    p2 = p2 ? p2.next : headA;
  }
  return p1;
}

// dfs 6-10
export function sortedArrayToBST(nums: number[]) {
  if (nums.length === 0) return null;
  const mid = Math.floor((nums.length - 1) / 2);
  const node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));
  return node;
}

export function sortedListToBST(head: ListNode | null) {
  const buildTree = (head: ListNode | null, tail: ListNode | null) => {
    if (head === tail) return null;
    const node = getMid(head, tail);
    const res = new TreeNode(node.val);
    res.left = buildTree(head, node);
    res.right = buildTree(node.next, tail);
    return res;
  };
  const getMid = (head: ListNode | null, tail: ListNode | null) => {
    let slow = head,
      fast = head;
    while (slow !== tail && fast !== tail && fast?.next !== tail) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    return slow!;
  };
  return buildTree(head, null);
}

export function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
  };
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

export function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) return level;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
}

export function hasPathSum(root: TreeNode | null, targetSum: number) {
  if (!root) return false;
  const dfs = (node: TreeNode, sum: number): boolean => {
    if (!node.left && !node.right && sum === targetSum) return true;
    return [node.left, node.right]
      .filter((item) => item)
      .some((node) => dfs(node!, sum + node!.val));
  };
  return dfs(root, root.val);
}
