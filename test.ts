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

// offer 30 31
export class MinStack {
  queue: number[];
  stack: number[];
  constructor() {
    this.stack = [];
    this.queue = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.stack.length === 0) throw new Error("error");
    const res = this.stack.pop();
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (this.stack.length === 0) throw new Error("error");
    return this.stack[this.stack.length - 1];
  }
  min() {
    if (this.stack.length === 0) throw new Error("error");
    return this.queue[0];
  }
}

export function validateStackSequence(pushed: number[], popped: number[]) {
  const stack: number[] = [];
  let i = 0;
  for (let item of pushed) {
    stack.push(item);
    while (stack.length > 0 && stack[stack.length - 1] === pushed[i]) {
      stack.pop();
      i++;
    }
  }
  return stack.length === 0;
}

// graph
export function bfs(
  graph: Record<number, number[]>,
  visited: Set<number>,
  node: number
) {
  const queue: number[] = [node];
  visited.add(node);
  const res: number[] = [];
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
  visited: Set<number>,
  node: number
) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, visited, item);
    }
  });
}

export function fn(matrix: number[][]) {
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
  const res: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) res.push([r, c]);
    }
  }
  return res;
}

export class GraphNode {
  val: number;
  neighbours: GraphNode[];
  constructor(val: number) {
    this.val = val;
    this.neighbours = [];
  }
}

export function cloneGraph(node: GraphNode | null) {
  if (!node) return null;
  const map = new Map<GraphNode, GraphNode>();
  const dfs = (node: GraphNode) => {
    const newNode = new GraphNode(node.val);
    map.set(node, newNode);
    node.neighbours.forEach((item) => {
      if (!map.has(item)) {
        dfs(item);
      }
      newNode.neighbours.push(map.get(item)!);
    });
  };
  dfs(node);
  return map.get(node)!;
}

export function cloneGraph1(node: GraphNode | null) {
  if (!node) return null;
  const queue: GraphNode[] = [node];
  const map = new Map<GraphNode, GraphNode>();
  map.set(node, new GraphNode(node.val));
  while (queue.length) {
    const current = queue.shift()!;
    current.neighbours.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, new GraphNode(item.val));
        queue.push(item);
      }
      map.get(current)?.neighbours.push(map.get(item)!);
    });
  }
  return map.get(node)!;
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

// todo