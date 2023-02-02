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

// todo 87

// string 6-10
export function groupAnagrams(strs: string[]) {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const key = item.split("").sort().join("");
    if (map.has(key)) {
      map.get(key)!.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  const res: string[][] = [];
  for (let [key, value] of map) {
    res.push(value);
  }
  return res;
}

export function simplifyPath(path: string) {
  const stack: string[] = [];
  const dirs = path.split("/");
  for (let item of dirs) {
    if (item === "" || item === ".") continue;
    if (item === "..") {
      dirs.pop();
      continue;
    }
    dirs.push(item);
  }
  return "/" + dirs.join("/");
}

export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp: number[] = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseFloat(s[i - 2]) + parseFloat(s[i - 1]) > 26
        ? 0
        : dp[i - 2]);
  }
  return dp[s.length];
}

export function restoreIpAddresses(s: string) {
  const res: string[] = [];
  const dfs = (path: string[], index: number) => {
    if (path.length === 4) {
      if (index === s.length) {
        res.push(path.join("."));
      }
      return;
    }
    if (index === s.length) return;
    const current = s[index];
    if (current === "0") {
      dfs(path.concat(current), index + 1);
      return;
    }
    let num = 0;
    for (let i = index; i < s.length; i++) {
      num = num * 10 + parseFloat(s[i]);
      if (num > 0 && num < 255) {
        dfs(path.concat(num + ""), i + 1);
      } else {
        break;
      }
    }
  };
  dfs([], 0);
  return res;
}

export function isPalindrome(s: string) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    const currentl = s[l];
    const currentr = s[r];
    if (
      isNaN(parseFloat(currentl)) &&
      currentl.toLowerCase() === currentl.toUpperCase()
    ) {
      l++;
      continue;
    }
    if (
      isNaN(parseFloat(currentr)) &&
      currentr.toLowerCase() === currentr.toLowerCase()
    ) {
      r--;
      continue;
    }
    if (currentl.toLowerCase() !== currentr.toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
