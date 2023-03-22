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
    // todo
  }
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
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function findMedianSortedArrays(nums1: number[], nums2: number[]) {
  const m = nums1.length;
  const n = nums2.length;
  const find = (nums1: number[], nums2: number[], k: number) => {
    let index1 = 0,
      index2 = 0;
    while (true) {
      if (index1 >= nums1.length) {
        return nums2[index2 + k - 1];
      }
      if (index2 >= nums2.length) {
        return nums1[(index1 = k - 1)];
      }
      const half = Math.floor(k / 2);
      const newIndex1 = Math.min(nums1.length - 1, index1 + half - 1);
      const newIndex2 = Math.min(nums2.length - 1, index2 + half - 1);
      if (nums1[newIndex1] <= nums2[newIndex2]) {
        k -= newIndex1 - index1 + 1;
        index1 = newIndex1 + 1;
      } else {
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  };
  if ((m + n) % 2 === 1) {
    const k = Math.floor((m + n) / 2);
    return find(nums1, nums2, k + 1);
  } else {
    const k = Math.floor((m + n) / 2);
    return (find(nums1, nums2, k + 1), find(nums1, nums2, k)) / 2;
  }
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
