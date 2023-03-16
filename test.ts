import { BST } from "./11.BST";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 17 18
export function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 1; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export function deleteNode(head: ListNode | null, val: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
      break;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

// merge sort
export function mergeSort(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] > temp[j]) {
        arr[k] = temp[j];
        j++;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  const res = [...arr];
  sortArr(res, 0, res.length - 1, [...arr]);
  return res;
}

export function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) res++;
    }
  }
  return res;
}

export function reversePairs1(nums: number[]) {
  let res = 0;
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if(l >= r) return
    const mid = Math.floor(l + (r - l) / 2)
    sortArr(arr, l, mid, temp)
    sortArr(arr, mid + 1, r, temp)
    if(arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp)
    }
  }
  const merge = (arr: number[], l: number, mid: number, r: number, temp: number[]) => {
    // todo
  }
}

// hot 97-100
export function mergeTrees(root1: TreeNode | null, root2: TreeNode | null) {
  if (!root1) return root2;
  if (!root2) return root1;
  const res = new TreeNode(root1.val + root2.val);
  res.left = mergeTrees(root1.left, root2.left);
  res.right = mergeTrees(root2.left, root2.right);
  return res;
}

export function leastInterval(tasks: string[], n: number) {
  const map = new Map<string, number>();
  for (let i = 0; i < tasks.length; i++) {
    map.set(tasks[i], map.has(tasks[i]) ? map.get(tasks[i])! + 1 : 1);
  }
  const rest = Array.from(map).map((item) => item[1]);
  const valid: number[] = new Array(rest.length).fill(1);
  let time = 0;
  for (let i = 0; i < tasks.length; i++) {
    let minNextValid = Infinity;
    for (let j = 0; j < valid.length; j++) {
      if (rest[j] > 0) {
        minNextValid = Math.min(minNextValid, valid[j]);
      }
    }
    time = Math.max(time + 1, minNextValid);
    let best = -1;
    for (let j = 0; j < valid.length; j++) {
      if (rest[j] > 0 && valid[j] <= time) {
        if (best === -1 || rest[j] > rest[best]) {
          best = j;
        }
      }
    }
    valid[best] = time + 1 + n;
    rest[best] -= 1;
  }
  return time;
}

export function countSubstrings(s: string) {
  let res = 0;
  for (let i = 0; i < 2 * s.length - 1; i++) {
    let l = Math.floor(i / 2);
    let r = Math.floor(i / 2) + (i % 2);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      res++;
      l--;
      r++;
    }
  }
  return res;
}

export function dailyTemperatures(temperatures: number[]) {
  const res: number[] = new Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    const current = temperatures[i];
    while (stack.length > 0 && current > stack[stack.length - 1]) {
      const index = stack.pop()!;
      res[index] = i - index;
    }
    stack.push(i);
  }
  return res;
}

// backtrack 1-5
export function letterCombinations(digits: string) {
  if (digits === "") return [];
  const arr = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const res: string[] = [];
  const dfs = (path: string, index: number) => {
    if (index >= digits.length) {
      res.push(path);
      return;
    }
    const current = arr[parseInt(digits[index])];
    for (let i = 0; i < current.length; i++) {
      dfs(path + current[i], index + 1);
    }
  };
  dfs("", 0);
  return res;
}

export function generateParenthesis(n: number) {
  if (n === 0) return [];
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length === 2 * n) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close);
    }
  };
  dfs("", 0, 0);
  return res;
}

export function permuteUnique(nums: number[]) {
  if (nums.length === 0) return [];
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const set = new Set<number>();
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && set.has(i - 1)) continue;
      if (!set.has(i)) {
        set.add(i);
        dfs(path.concat(nums[i]));
        set.delete(i);
      }
    }
  };
  dfs([]);
  return res;
}

export function getPermutation(n: number, k: number) {
  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum *= i;
  }
  const dfs = (path: number[]): string => {
    if (path.length === n) {
      return path.join("");
    }
    groupNum = groupNum / (n - path.length);
    for (let i = 1; i <= n; i++) {
      if (path.includes(i)) continue;
      if (k > groupNum) {
        k -= groupNum;
        continue;
      }
      return dfs(path.concat(i));
    }
    return "";
  };
  return dfs([]);
}

export function combine(n: number, k: number) {
  const res: number[][] = [];
  const dfs = (path: number[], start: number) => {
    if (path.length + n - start + 1 < k) return;
    if (path.length === k) {
      res.push(path);
      return;
    }
    for (let i = start; i <= n; i++) {
      dfs(path.concat(i), i + 1);
    }
  };
  dfs([], 1);
  return res;
}
