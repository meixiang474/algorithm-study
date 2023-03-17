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
        res += mid - i + 1;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  const arr = [...nums];
  sortArr(arr, 0, arr.length - 1, [...nums]);
  return res;
}

export function merge(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = res;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return res.next;
}

// hot 1-4
export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const rest = target - nums[i];
    if (map.has(rest)) {
      return [i, map.get(rest)!];
    }
    map.set(nums[i], i);
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = res;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) p3.next = new ListNode(carry);
  return res.next;
}

export function lengthOfLongestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const current = s[r];
    if(map.has(current) && map.get(current)! >= l) {
        // todo
    }
  }
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
