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
  if (s.length === 1) return s;
  const dp: boolean[][] = Array.from({ length: s.length }, () =>
    new Array(s.length).fill(false)
  );
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }
  let maxLength = 1;
  let startIndex = 0;
  for (let l = 2; l <= s.length; l++) {
    for (let left = 0; left < s.length; left++) {
      const right = left + l - 1;
      if (right >= s.length) break;
      if (s[left] !== s[right]) {
        dp[left][right] = false;
      } else {
        if (right - left + 1 <= 3) {
          dp[left][right] = true;
        } else {
          dp[left][right] = dp[left + 1][right - 1];
        }
      }
      if (dp[left][right]) {
        maxLength = l;
        startIndex = left;
      }
    }
  }
  return s.slice(startIndex, startIndex + maxLength);
};

export const isMatch = (s: string, p: string): boolean => {
  if (p.length === 0) return s.length === 0;
  let match = false;
  if (s.length > 0 && (s[0] === p[0] || p[0] === ".")) {
    match = true;
  }
  if (p.length > 1 && p[1] === "*") {
    return isMatch(s, p.slice(2)) || (match && isMatch(s.slice(1), p));
  } else {
    return match && isMatch(s.slice(1), p.slice(1));
  }
};

export const maxArea = (nums: number[]) => {
  let res = 0;
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const left = nums[l];
    const right = nums[r];
    res = Math.max(Math.min(left, right) * (r - l), res);
    if (left > right) {
      r--;
    } else {
      l++;
    }
  }
  return res;
};

export const threeSum = (nums: number[]) => {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current > 0) break;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = current + currentl + currentr;
      if (sum === 0) {
        res.push([current, currentl, currentr]);
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else {
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
      }
    }
  }
  return res;
};

// bfs 1-5
export const isSymmestric = (root: TreeNode | null) => {
  if (!root) return false;
  const dfs = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      dfs(p.left, q.right) &&
      dfs(p.right, q.left)
    )
      return true;
    return false;
  };
  return dfs(root.left, root.right);
};

export const levelOrder = (root: TreeNode | null) => {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
};

// todo