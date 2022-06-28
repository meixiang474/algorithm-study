import { Heap } from "./practice/week5/1.heap";

// offer 36
export function permutation(s: string) {
  const arr = s.split("").sort();
  const map = new Map<number, boolean>();
  const res: string[] = [];
  const dfs = (path: string) => {
    if (path.length === s.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (i > 0 && arr[i] === arr[i - 1] && map.has(i - 1)) continue;
      if (!map.has(i)) {
        map.set(i, true);
        dfs(path + arr[i]);
        map.delete(i);
      }
    }
  };
  dfs("");
  return res;
}

// priority-queue shell-sort
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
  const res: number[] = [...nums];
  let h = Math.floor(res.length / 2);
  while (h < res.length) {
    h = h * 3 + 1;
  }
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; h -= h) {
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

// hot 7 8
export function maxArea(heights: number[]) {
  let l = 0,
    r = heights.length;
  let res = 0;
  while (l < r) {
    res = Math.max(res, Math.min(heights[l], heights[r]) * (r - l));
    if (heights[l] > heights[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

// leetcode tree 6-10
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

export function zigzagLevelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
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
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
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
    const [node, level] = queue.shift()!;
    if (currentLevel === level) {
      res[0].push(node.val);
    } else {
      const arr: number[] = [];
      arr.push(node.val);
      res.unshift(arr);
      currentLevel = level;
    }
    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
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
