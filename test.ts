import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
import { Heap } from "./practice/week5/1.heap";
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

// offer 12 13
export function exists(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index === word.length - 1) return true;
    const temp = board[r][c];
    const res = (board[r][c] = "");
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    board[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
}

export function movingCount(m: number, n: number, k: number) {
  if (m === 0 || n === 0) return 0;
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
    map[r][c] = true;
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
            .map((i) => parseFloat(i))
            .reduce((a, b) => a + b) +
          nextC
            .toString()
            .split("")
            .map((i) => parseFloat(i))
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

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("{", "}");
  map.set("(", ")");
  map.set("[", "]");
  const stack: string[] = [];
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const res = stack.pop();
      if (res == null || map.get(res) !== item) return false;
    }
  }
  return stack.length === 0;
}

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = []
    this.queue = []
  }
  getSize() {
    return this.items.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
  push(item: number) {
    this.items.push(item)
    // todo
  }
}

// hot 85-88
export function calcEquation(
  equations: number[][],
  values: number[],
  queries: number[][]
) {
  const map = new Map<number, number>();
  let count = 0;
  for (let item of equations) {
    const [num1, num2] = item;
    if (!map.has(num1)) {
      map.set(num1, count++);
    }
    if (!map.has(num2)) {
      map.set(num1, count++);
    }
  }
  const graph: number[][][] = new Array(count).fill(null);
  for (let i = 0; i < count; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < equations.length; i++) {
    const num1 = equations[i][0];
    const num2 = equations[i][1];
    const index1 = map.get(num1)!;
    const index2 = map.get(num2)!;
    graph[index1].push([index2, values[i]]);
    graph[index2].push([index1, 1 / values[i]]);
  }
  const res: number[] = [];
  for (let i = 0; i < queries.length; i++) {
    const index1 = map.get(queries[i][0])!;
    const index2 = map.get(queries[i][1])!;
    if (index1 == null || index2 == null) {
      res[i] = -1;
      continue;
    }
    if (index1 === index2) {
      res[i] = 1;
      continue;
    }
    const ratios: number[] = new Array(count).fill(-1);
    ratios[index1] = 1;
    const queue = [index1];
    while (queue.length && ratios[index2] !== -1) {
      const current = queue.shift()!;
      const arr = graph[current];
      for (let i = 0; i < arr.length; i++) {
        const [next, value] = arr[i];
        if (ratios[next] === -1) {
          ratios[next] = value * ratios[current];
        }
      }
    }
    res[i] = ratios[index2];
  }
  return res;
}

export function reconstructQueue(people: number[][]) {
  people.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return b[1] - a[1];
    }
  });
  const res: number[][] = new Array(people.length).fill(null);
  for (let i = 0; i < people.length; i++) {
    const prevCount = people[i][1];
    let index = prevCount + 1;
    for (let j = 0; j < res.length; j++) {
      if (res[j] == null) {
        index--;
        if (index === 0) {
          res[j] = people[i];
          break;
        }
      }
    }
  }
  return res;
}

export function canPartition(nums: number[]) {
  let sum = 0;
  let max = nums[0];
  for (let item of nums) {
    sum += item;
    max = Math.max(max, item);
  }
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  if (max > target) return false;
  const dp: boolean[][] = Array.from({ length: nums.length }, () =>
    new Array(target + 1).fill(false)
  );
  for (let i = 0; i < nums.length; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= current) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - current];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[nums.length - 1][target];
}

export function pathSum(root: TreeNode | null, targetSum: number) {
  if (!root) return 0;
  const map = new Map<number, number>();
  map.set(0, 1);
  const dfs = (node: TreeNode | null, sum: number): number => {
    if (!node) return 0;
    sum += node.val;
    let count = map.has(sum - targetSum) ? map.get(sum - targetSum)! : 0;
    map.set(sum, map.has(sum) ? map.get(sum)! + 1 : 1);
    count += dfs(node.left, sum);
    count += dfs(node.right, sum);
    map.set(sum, map.get(sum)! - 1);
    return count;
  };
  return dfs(root, 0);
}

// tree 6-10
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}

export function zigzagLevelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
    }
    if (node.left) {
      dfs(node.left, level + 1);
    }
    if (node.right) {
      dfs(node.right, level + 1);
    }
  };
  dfs(root, 1);
  return res;
}

export function levelOrderBottom(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  let currentLevel = -1;
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (currentLevel === level) {
      res[0].push(current.val);
    } else {
      const arr = [current.val];
      res.unshift(arr);
      currentLevel = level;
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}

export function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const mid = Math.floor((nums.length - 1) / 2);
  const node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));
  return node;
}
