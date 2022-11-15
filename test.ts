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

export function findRepeatNumber(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    if (set.has(item)) return item;
    set.add(item);
  }
}

// priorityqueue shellsort
export class PriorityQueue<T = number> {
  maxHeap: Heap<T>;
  constructor(compare: (a: T, b: T) => boolean) {
    this.maxHeap = new Heap("max", compare);
  }
  getSize() {
    return this.maxHeap.size();
  }
  isEmpty() {
    return this.maxHeap.size() === 0;
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
        let current = res[i];
        for (let j = i - h; j >= start; j -= h) {
          if (res[j] > current) {
            swapIndex = j;
            res[j + h] = res[j];
          } else {
            break;
          }
        }
        if (swapIndex !== i) {
          res[swapIndex] = current;
        }
      }
    }
    h = Math.floor(h / 2);
  }
  return h;
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
          swapIndex = j;
          res[j + h] = res[j];
        } else {
          break;
        }
      }
      if (swapIndex !== i) {
        res[swapIndex] = current;
      }
    }
    h = Math.floor(h / 2);
  }
  return res;
}

export function shellSort2(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(nums.length / 2);
  while (h < res.length) {
    h = h * 3 + 1;
  }
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; j -= h) {
        if (res[j] > current) {
          swapIndex = j;
          res[j + h] = res[j];
        } else {
          break;
        }
      }
      if (swapIndex !== i) {
        res[swapIndex] = current;
      }
    }
    h = Math.floor(h / 3);
  }
  return res;
}

// hot 69-72
export function maxSlidingWindow(nums: number[], k: number) {
  if (nums.length === 0 || k === 0) return [];
  const stack: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    stack.push(i);
  }
  res.push(nums[stack[0]]);
  for (let i = k; i < nums.length; i++) {
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    stack.push(i);
    if (stack[0] <= i - k) stack.shift();
    res.push(nums[stack[0]]);
  }
  return res;
}

export function searchMatrix(matrix: number[][], target: number) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number): boolean => {
    if (matrix[r][c] === target) return true;
    if (matrix[r][c] > target) {
      return c - 1 >= 0 && dfs(r, c - 1);
    } else {
      return r + 1 < m && dfs(r + 1, c);
    }
  };
  return dfs(0, n - 1);
}

export function minMeetingRooms(intervals: number[][]) {
  const map = new Array(intervals.length).fill(false);
  const dfs = (stop: number) => {
    let l = 0,
      r = intervals.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (intervals[mid][0] >= stop) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    while (map[l]) {
      l++;
    }
    if (l >= intervals.length) return;
    map[l] = true;
    dfs(intervals[l][1]);
  };
  let res = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (!map[i]) {
      res++;
      dfs(intervals[i][1]);
    }
  }
  return res;
}

export function numSquares(n: number) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  const dp = [0];
  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    for (let j = 1; j ** 2 <= i; j++) {
      min = Math.min(min, dp[i - j ** 2]);
    }
    dp[i] = min + 1;
  }
  return dp[n];
}

// math 6-10
// todo