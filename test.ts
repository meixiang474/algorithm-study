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

// offer 21 22
export function exchange(nums: number[]) {
  const res: number[] = [];
  for (const item of nums) {
    if (item % 2 === 0) res.push(item);
    else res.unshift(item);
  }
  return res;
}

export function getKthFromEnd(head: ListNode | null, k: number) {
  if (!head) return null;
  const arr: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    arr.push(current);
    current = current.next;
  }
  return arr[arr.length - k];
}

// quick sort
export function quickSort(data: number[]) {
  const sortArr = (data: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(data, l, r);
    sortArr(data, l, p - 1);
    sortArr(data, p + 1, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (data: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(data, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (data[i] < data[l] && i <= j) {
        i++;
      }
      while (data[j] > data[l] && i <= j) {
        j--;
      }
      if (i >= j) break;
      swap(data, i, j);
      i++;
      j--;
    }
    swap(data, l, j);
    return j;
  };
  const res = [...data];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSortThree(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let left = l,
      right = r + 1,
      i = l + 1;
    while (i < right) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, i, left);
        i++;
      } else if (arr[i] > arr[l]) {
        right--;
        swap(arr, i, right);
      } else {
        i++;
      }
    }
    swap(arr, l, left);
    return {
      left: left - 1,
      right,
    };
  };
  const res = [...arr];
  sortArr(res, 0, res.length - 1);
  return res;
}

export const sortColors = (nums: number[]) => {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let l = -1,
    i = 0,
    r = nums.length;
  while (i < r) {
    if (nums[i] === 0) {
      l++;
      swap(nums, l, i);
      i++;
    } else if (nums[i] === 2) {
      r--;
      swap(nums, r, i);
    } else {
      i++;
    }
  }
  return nums;
};

export const findKMax = (nums: number[], k: number) => {
  k = nums.length - k;
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l === r) return arr[k];
    const p = partition(arr, l, r);
    if (p === k) return arr[k];
    else if (p > k) return sortArr(arr, l, p - 1);
    else return sortArr(arr, p + 1, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
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
  return sortArr([...nums], 0, nums.length - 1);
};

export const findKMin = (nums: number[], k: number) => {
  if (k >= nums.length) return nums.slice();
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) return nums.slice(0, k);
    else if (p > k) return sortArr(arr, l, p - 1);
    else return sortArr(arr, p + 1, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (i <= j && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, j, l);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
};

// hot 5-8
export const longestPalindrome = (s: string) => {
  if(s.length === 1) return s;
  const dp: boolean[][] = Array.from({length: s.length}, () => new Array(s.length).fill(false));
  // todo
}

// binarysearch 1-5
export function myPow(x: number, n: number) {
  const isNegative = n < 0;
  n = isNegative ? -n : n;
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNegative ? 1 / absPow(x, n) : absPow(x, n);
}

export function mySqrt(x: number) {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= x) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

export function twoSum1(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum > target) {
      l++;
    } else {
      r--;
    }
  }
}

export function minSubArrayLen(nums: number[], target: number) {
  let l = 0,
    r = 0,
    res = 0,
    sum = 0;
  while (r < nums.length) {
    const current = nums[r];
    sum += current;
    while (sum >= target) {
      if (res === 0 || res > r - l + 1) {
        res = r - l + 1;
      }
      sum -= nums[l];
      l++;
    }
    r++;
  }
  return res;
}

export function countNodes(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    res++;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}
