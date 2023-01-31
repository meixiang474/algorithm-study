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

// offer 9 10
export class QueueBasedOnStack {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: number) {
    this.stack1.push(item);
  }
  dequeue() {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop();
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}

export function fib(n: number) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[n] = dp[n - 1] + dp[n - 2];
  }
  return dp[n];
}

// search sort
export function isObject<T>(obj: T) {
  return typeof obj === "object" && obj != null;
}

export function isEqual<T>(a: T, b: T) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keysA = Object.keys(a as {});
  const keysB = Object.keys(b as {});
  if (keysA.length !== keysB.length) return false;
  for (let key in a) {
    if ((a as {}).hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(data: T[], target: T) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) return i;
  }
  return -1;
}

export function selectionSort(data: number[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(res, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let current = data[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j] > res[j + 1]) {
        const temp = res[j];
        res[j] = res[j + 1];
        res[j + 1] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// hot 81-84
export function rob(root: TreeNode | null) {
  const dfs = (node: TreeNode | null): [number, number] => {
    if (!node) return [0, 0];
    const left = dfs(node.left);
    const right = dfs(node.right);
    return [
      node.val + left[1] + right[1],
      Math.max(left[0], left[1]) + Math.max(right[0], right[1]),
    ];
  };
  const [select, notSelect] = dfs(root);
  return Math.max(select, notSelect);
}

export function countBits(n: number) {
  const res: number[] = new Array(n + 1).fill(0);
  let hightBit = 0;
  for (let i = 0; i <= n; i++) {
    if ((i & (i - 1)) === 0) {
      hightBit = i;
    }
    res[i] = res[i - hightBit] + 1;
  }
  return res;
}

export function topKFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const arr: [number, number][] = [];
  for (let [key, value] of map) {
    arr.push([key, value]);
  }
  if (k >= arr.length) return arr.map((item) => item[0]);
  k = arr.length - k;
  const sortArr = (arr: [number, number][], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(k).map((item) => item[0]);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(k).map((item) => item[0]);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const swap = <T>(arr: T[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (arr: [number, number][], l: number, r: number): number => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i][1] < arr[l][1]) {
        i++;
      }
      while (i <= j && arr[j][1] > arr[l][1]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr(arr, 0, arr.length - 1);
}

export function decodeString(s: string) {
  let index = 0;
  const getString = (): string => {
    if (index >= s.length || s[index] === "]") return "";
    const current = s[index];
    let res = "";
    if (!isNaN(parseFloat(current))) {
      const count = getCount();
      index++;
      const str = getString();
      index++;
      res += str.repeat(count);
    } else {
      res = current;
      index++;
    }
    return res + getString();
  };
  const getCount = () => {
    let res = 0;
    while (index < s.length && s[index] !== "[") {
      res = res * 10 + parseFloat(s[index]);
    }
    return res;
  };
}

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

// todo 10
