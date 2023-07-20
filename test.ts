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

// offer 48 49
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

export function nthUglyNumber(n: number) {
  const dp = [1];
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 1; i < n; i++) {
    const n1 = dp[a] * 2;
    const n2 = dp[b] * 3;
    const n3 = dp[c] * 5;
    dp[i] = Math.min(n1, n2, n3);
    if (dp[i] === n1) a++;
    if (dp[i] === n2) b++;
    if (dp[i] === n3) c++;
  }
  return dp[n - 1];
}

// stack
export class Stack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  push(item: T) {
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    return this.items.pop()!;
  }
  peek() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  toString() {
    return this.items.toString();
  }
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
      const prev = stack.pop()!;
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
}

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (this.items.length === 0) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  min() {
    if (this.items.length === 0) throw new Error("error");
    return this.queue[0];
  }
}

export class CustomStack {
  items: number[];
  maxSize: number;
  constructor(maxSize: number) {
    this.items = [];
    this.maxSize = maxSize;
  }
  push(item: number) {
    if (this.items.length >= this.maxSize) return;
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) return -1;
    return this.items.pop()!;
  }
  inc(k: number, val: number) {
    if (this.items.length <= k) {
      this.items = this.items.map((item) => (item += val));
    } else {
      for (let i = 0; i < k; i++) {
        this.items[i] += val;
      }
    }
  }
}

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }
}

export function decToBi(num: number) {
  if (num === 0) return 0;
  const arr: number[] = [];
  while (num) {
    arr.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(arr.join(""));
}

// hot 53 - 56


// two pointers 1 - 5
export function longestSubstring(s: string) {
  let res = 0;
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr) && map.get(currentr)! >= l) {
      l = map.get(currentr)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(currentr, r);
    r++;
  }
  return res;
}

export function maxArea(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  let res = 0;
  while (l < r) {
    const left = nums[l];
    const right = nums[r];
    res = Math.min(left, right) * (r - l);
    if (left < right) {
      l++;
    } else {
      r--;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (current + nums[i + 1] + nums[i + 2] > 0) break;
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[nums.length - 2] + nums[nums.length - 1] < 0) break;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = left + right + current;
      if (sum === 0) {
        res.push([current, left, right]);
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          l++;
          if (nums[l] !== left) break;
        }
      } else {
        while (l < r) {
          r--;
          if (nums[r] !== right) break;
        }
      }
    }
  }
  return res;
}

export function threeSumClosest(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  let res = 0;
  let diff = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    let isEqual = false;
    if (i > 0 && current === nums[i]) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const left = nums[l];
      const right = nums[r];
      const sum = left + right + current;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        diff = newDiff;
        res = sum;
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        }
      }
    }
    if (isEqual) {
      break;
    }
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
      nums[nums.length - 1] +
      nums[nums.length - 2] +
      nums[nums.length - 3]
    )
      break;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (currentj > i + 1 && currentj === nums[j - 1]) continue;
      if (currentj + current + nums[j + 1] + nums[j + 2] > target) break;
      if (current + currentj + nums[nums.length - 1] + nums[nums.length - 2])
        break;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const left = nums[l];
        const right = nums[r];
        const sum = left + right + current + currentj;
        if (sum === target) {
          res.push([left, right, currentj, current]);
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== right) break;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== left) break;
          }
        }
      }
    }
  }
  return res;
}
