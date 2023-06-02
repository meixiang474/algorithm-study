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
  // todo
}

// sliding window 1-7
export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0,
    res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    r++;
  }
  return res;
}

export function charactorReplacement(s: string, k: number) {
  const arr: number[] = new Array(26).fill(0);
  let l = 0,
    r = 0,
    max = 0;
  while (r < s.length) {
    const current = s[r];
    arr[current.charCodeAt(0) - "A".charCodeAt(0)]++;
    max = Math.max(max, arr[current.charCodeAt(0) - "A".charCodeAt(0)]);
    if (r - l + 1 - max > k) {
      arr[s[l].charCodeAt(0) - "A".charCodeAt(0)]--;
      l++;
    }
    r++;
  }
  return r - l;
}

export function checkInclusion(s1: string, s2: string) {
  if (s1.length > s2.length) return false;
  const arr1: number[] = new Array(26).fill(0);
  const arr2: number[] = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    const current1 = s1[i];
    const current2 = s2[i];
    arr1[current1.charCodeAt(0) - "a".charCodeAt(0)];
    arr2[current2.charCodeAt(0) - "a".charCodeAt(0)];
  }
  if (arr1.toString() === arr2.toString()) return true;
  for (let i = s1.length; i < s2.length; i++) {
    arr2[s2[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    arr2[s2[i - s1.length].charCodeAt(0) - "a".charCodeAt(0)]--;
    if (arr2.toString() === arr2.toString()) return true;
  }
  return false;
}

export function maxTurbulence(nums: number[]) {
  let res = 1,
    l = 0,
    r = 0;
  while (r < nums.length - 1) {
    const left = nums[l];
    const right = nums[r];
    if (l === r) {
      if (left === nums[l + 1]) l++;
      r++;
    } else {
      if (
        (right > nums[r - 1] && right > nums[r + 1]) ||
        (right < nums[r - 1] && right < nums[r + 1])
      ) {
        r++;
      } else {
        l = r;
      }
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
}

export function longestOnes(nums: number[], k: number) {
  let max = 0,
    l = 0,
    r = 0,
    onesInWindow = 0;
  while (r < nums.length) {
    const current = nums[r];
    if (current === 1) onesInWindow++;
    max = Math.max(max, current);
    if (r - l + 1 - max > k) {
      l++;
      onesInWindow--;
    }
    r++;
  }
  return r - l;
}

export function moveStones(nums: number[]) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const max =
    nums[n - 1] -
    nums[0] +
    1 -
    n -
    Math.min(nums[n - 1] - nums[n - 2] - 1, nums[1] - nums[0] - 1);
  let min = Infinity;
  let l = 0,
    r = 0;
  for (let l = 0; l < n; l++) {
    while (r + 1 < n && nums[r + 1] - nums[l] + 1 <= n) {
      r++;
    }
    let res = n - r + l - 1;
    if (r - l + 1 === n - 1 && nums[r] - nums[l] + 1 === n - 1) {
      res = 2;
    }
    min = Math.min(res, min);
  }
  return [min, max];
}

export function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
) {
  let total = 0;
  for (let i = 0; i < grumpy.length; i++) {
    if (grumpy[i] === 0) total += customers[i];
  }
  let increase = 0;
  for (let i = 0; i < minutes; i++) {
    increase += customers[i] * grumpy[i];
  }
  for (let i = minutes; i < grumpy.length; i++) {
    const newIncrease =
      increase -
      customers[i - minutes] * grumpy[i - minutes] +
      customers[i] * grumpy[i];
    increase = Math.max(increase, newIncrease);
  }
  return total + increase;
}
