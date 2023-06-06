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

// offer 34 35
export function pathSum(root: TreeNode | null, target: number) {
  if (!root) return [];
  const res: number[][] = [];
  const dfs = (node: TreeNode, path: number[], sum: number) => {
    if (sum === target && !node.left && !node.right) {
      res.push(path);
      return;
    }
    if (node.left) {
      dfs(node.left, path.concat(node.left.val), sum + node.left.val);
    }
    if (node.right) {
      dfs(node.right, path.concat(node.right.val), sum + node.right.val);
    }
  };
  dfs(root, [root.val], root.val);
  return res;
}

class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(list: RandomListNode | null) {
  if (!list) return null;
  const visited = new Map<
    RandomListNode | null | undefined,
    RandomListNode | null
  >();
  visited.set(null, null);
  visited.set(undefined, null);
  const dfs = (node: RandomListNode) => {
    const newNode = new RandomListNode(node.val);
    visited.set(node, newNode);
    if (node.next && !visited.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = visited.get(node.next)!;
    if (node.random && !visited.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = visited.get(node.random)!;
  };
  dfs(list);
  return visited.get(list)!;
}

// priority queue shell sort
export class PriorityQueue<T = number> {
  maxHeap: Heap<T>;
  constructor(compare?: (a: T, b: T) => boolean) {
    this.maxHeap = new Heap("max", compare);
  }
  getSize() {
    return this.maxHeap.size();
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  getFront() {
    return this.maxHeap.peek();
  }
  enqueue(item: T) {
    this.maxHeap.insert(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    return this.maxHeap.pop();
  }
}

export function shellSort(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(nums.length / 2);
  while (h) {
    for (let start = 0; start < h; start++) {
      for (let i = start; i < res.length; i += h) {
        let swapIndex = i;
        const current = res[i];
        for (let j = i - h; j >= 0; j -= h) {
          if (res[j] > current) {
            res[j + h] = res[j];
            swapIndex = j;
          } else {
            break;
          }
        }
        if (swapIndex !== i) res[swapIndex] = current;
      }
    }
    h = Math.floor(h / 2);
  }
  return res;
}

export function shellSort1(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(res.length / 2);
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; j -= h) {
        if (res[j] > current) {
          res[j + h] = res[j];
          swapIndex = j;
        } else {
          break;
        }
      }
      if (swapIndex !== i) res[swapIndex] = current;
    }
    h = Math.floor(h / 2);
  }
  return res;
}

export function shellSort2(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(res.length / 2);
  while (h < res.length) {
    h = h * 3 + 1;
  }
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; j -= h) {
        if (res[j] > current) {
          res[j + h] = res[j];
          swapIndex = j;
        } else {
          break;
        }
      }
      if (swapIndex !== i) res[swapIndex] = current;
    }
    h = Math.floor(h / 3);
  }
  return res;
}

// hot 33 - 36
export function subsets(nums: number[]) {
  const res: number[][] = [];
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
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function exist(board: string[][], word: string) {
  if (word.length) return true;
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    const temp = board[r][c];
    board[r][c] = "";
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index]
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
        const res = dfs(r, c, 1);
        if (res) return true;
      }
    }
  }
  return false;
}

export function largestRectangleArea(heights: number[]) {
  const stack: number[] = [];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }
  stack.length = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length && heights[0] >= heights[i]) {
      heights.shift();
    }
    right[i] = stack.length ? stack[0] : heights.length;
    stack.unshift(i);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res = Math.max(res, (right[i] - left[i] - 1) * heights[i]);
  }
  return res;
}

export function maximalRectangle(matrix: string[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const left = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === "0") continue;
      left[r][c] = c > 0 ? left[r][c - 1] + 1 : 1;
    }
  }
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (left[r][c] === 0) continue;
      let width = left[r][c];
      let area = width;
      for (let i = r - 1; i >= 0; i--) {
        if (left[i][c] === 0) break;
        width = Math.min(width, left[i][c]);
        area = Math.max(area, width * (r - i + 1));
      }
      res = Math.max(res, area);
    }
  }
  return res;
}

// sort 1-5
// todo