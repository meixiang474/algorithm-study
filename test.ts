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

// offer 10-II 11
export function numWays(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function minArray(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else if (nums[mid] < nums[r]) {
      r = mid;
    } else {
      r--;
    }
  }
  return nums[l];
}

// array
export class MyArray<T> {
  data: (T | null)[];
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, e: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size >= this.data.length) {
      this.resize(this.data.length * 2);
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = e;
    this.size++;
  }
  addFirst(e: T) {
    this.add(0, e);
  }
  addLast(e: T) {
    this.add(this.size, e);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index];
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return true;
    }
    return false;
  }
  find(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return i;
    }
    return -1;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(e: T) {
    const index = this.find(e);
    if (index !== -1) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, e: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = e;
  }
  toString() {
    let res = `MyArray: size=${this.getSize()}, capacity=${
      this.getCapacity
    }\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
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
  if(!root) return []
  // todo 
}