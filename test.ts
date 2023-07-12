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

// offer 42 45
export function maxSubArray(nums: number[]) {
  if (nums.length === 0) return -Infinity;
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    if (dp[i - 1] >= 0) {
      dp[i] = dp[i - 1] + current;
    } else {
      dp[i] = current;
    }
  }
  return Math.max(...dp);
}

export function fn(nums: number[]) {
  return nums
    .map((item) => item + "")
    .sort((a, b) => parseFloat(a + b) - parseFloat(b + a))
    .join("");
}

// search sort
export function isObject<T>(obj: T) {
  return obj && typeof obj === "object";
}

export function isEqual<T>(a: T, b: T) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keys1 = Object.keys(a as any);
  const keys2 = Object.keys(b as any);
  if (keys1.length !== keys2.length) return false;
  for (let key in keys1) {
    if ((a as any).hasOwnProperty(key)) {
      const res = isEqual((a as any)[key], (b as any)[key]);
      if (!res) return false;
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

export function selectionSort(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) swap(res, i, minIndex);
  }
  return res;
}

export function insertionSort(nums: number[]) {
  const res = [...nums];
  for (let i = 0; i < nums.length; i++) {
    let current = res[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) res[swapIndex] = current;
  }
  return res;
}

export function bubbleSort(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < nums.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (res[i] > res[j]) {
        swap(res, i, j);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// hot 45 - 48
export function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) profit += prices[i + 1] - prices[i];
  }
  return profit;
}

export function maxPathSum(root: TreeNode | null) {
  if (!root) return 0;
  let res = -Infinity;
  const dfs = (node: TreeNode): number => {
    const left = Math.max(node.left ? dfs(node.left) : 0, 0);
    const right = Math.max(node.right ? dfs(node.right) : 0, 0);
    res = Math.max(res, left + right + node.val);
    return Math.max(left, right, 0) + node.val;
  };
  dfs(root);
  return res;
}

export function longestConsecutive(nums: number[]) {
  // todo
}

// string 1 - 5
export function longestSubstring(s: string) {
  let l = 0,
    r = 0;
  const map = new Map<string, number>();
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function letterCombinations(digits: string) {
  if (digits === "") return "";
  const map: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const res: string[] = [];
  const dfs = (path: string, index: number) => {
    if (index >= digits.length) {
      res.push(path);
      return;
    }
    const current = digits[index];
    const arr = map[current];
    for (let item of arr) {
      dfs(path + item, index + 1);
    }
  };
  dfs("", 0);
  return res;
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
}

export function generateParenthesis(n: number) {
  if (n === 0) return [];
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length >= n * 2) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close + 1);
    }
  };
  dfs("", 0, 0);
  return res;
}

export function strStr(haystack: string, needle: string) {
  if (haystack.length < needle.length) return -1;
  let res = -1;
  let index = 0;
  while (index < haystack.length) {
    if (haystack.length - index < needle.length) break;
    const current = haystack[index];
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < index + needle.length; i++) {
        if (haystack[index] !== needle[i - index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = index;
        break;
      }
    }
    index++;
  }
  return res;
}
