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

// offer 15 16
export function harmmingWeight(num: number) {
  return num
    .toString(2)
    .split("")
    .reduce((memo, current) => {
      if (current === "1") memo++;
      return memo;
    }, 0);
}

export function myPow(x: number, n: number) {
  const isNagitve = n < 0;
  n = isNagitve ? -n : n;
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNagitve ? 1 / absPow(x, n) : absPow(x, n);
}

// linked list
export class LinkedList<T = number> {
  dummyHead: ListNode<T>;
  size: number;
  constructor() {
    this.dummyHead = new ListNode<T>(-1 as T);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  add(index: number, val: T) {
    if (index < 0 || index > this.size) throw new Error("errors");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(val);
    prev.next.next = next;
    this.size++;
  }
  addFirst(val: T) {
    this.add(0, val);
  }
  addLast(val: T) {
    this.add(this.size, val);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current.val;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  set(index: number, val: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    current.val = val;
  }
  contains(val: T) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const res = prev.next!;
    prev.next = prev.next!.next;
    this.size--;
    return res.val;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(val: T) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.val === val) {
        break;
      } else {
        prev = prev.next;
      }
    }
    if (prev.next) {
      prev.next = prev.next.next;
      this.size--;
    }
  }
  toString() {
    let res = "";
    let current = this.dummyHead.next;
    while (current) {
      res += JSON.stringify(current.val) + "->";
      current = current.next;
    }
    return res + "NULL";
  }
}

export function removeElements(head: ListNode | null, target: number) {
  while (head && head.val === target) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next) {
    if (prev.next.val === target) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}

export function removeElements1(head: ListNode | null, target: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === target) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function removeElements2(
  head: ListNode | null,
  target: number
): ListNode | null {
  if (!head) return head;
  const res = removeElements2(head.next, target);
  if (head.val === target) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverse(head: ListNode | null) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

export function reverse1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverse1(head.next);
  head.next.next = head;
  head.next = null;
  return res;
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
    p3.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) p3.next = new ListNode(carry);
  return res.next;
}

export function fn(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = fn(head);
  if (res && head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return res;
  }
}

export function fn1(head: ListNode | null) {
  const res = new ListNode(-1);
  res.next = head;
  let prev = res;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return res.next;
}

export function fn2(head: ListNode | null) {
  if (!head || !head.next) return false;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

export function fn3(head: ListNode | null) {
  if (!head || !head.next) return true;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast?.next.next;
  }
  if (fast) {
    slow = slow!.next;
  }
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let p1 = prev;
  let p2: ListNode | null = head;
  while (p1 && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
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
  // todo
}

// array 1 - 41
export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) return [i, map.get(rest)!];
  }
}

export function maxArea(height: number[]) {
  let res = 0,
    l = 0,
    r = height.length - 1;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    res = Math.max(area, res);
    if (height[l] > height[r]) r--;
    else l++;
  }
  return res;
}

export function threeSum(nums: number[]) {
  const res: number[][] = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current > 0) break;
    if (nums.length - i - 2 < 0) break;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = current + currentl + currentr;
      if (sum === 0) {
        res.push([current, currentr, currentl]);
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
}

export function threeSumClosest(nums: number[], target: number) {
  let res = 0;
  let diff = Infinity;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let isEqual = false;
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (nums.length - i - 2 < 0) break;
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
    if (isEqual) break;
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && nums[i - 1] === current) continue;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (j > i + 1 && nums[j - 1] === currentj) continue;
      if (
        current + currentj + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      if (current + currentj + nums[j + 1] + nums[j + 2] > target) break;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const left = nums[l];
        const right = nums[r];
        const sum = current + currentj + left + right;
        if (sum === target) {
          res.push([current, currentj, left, right]);
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
    return res;
  }
}

export function removeDuplicates(nums: number[]) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (i > 0 && nums[i - 1] === nums[i]) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (nums[i] === val) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function combinationSum(nums: number[], target: number) {
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= nums.length) return;
    if (sum > target) return;
    dfs(path, sum, index + 1);
    dfs(path.concat(nums[index]), sum + nums[index], index);
  };
  dfs([], 0, 0);
  return res;
}

export function combineSum2(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= nums.length) return;
    if (sum > target) {
      return;
    }
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i - 1] === nums[i]) continue;
      if (sum > target) return;
      if (index >= nums.length) return;
      for (let i = index; i < nums.length; i++) {
        if (i > index && nums[i] === nums[i - 1]) continue;
        dfs(path.concat(nums[i]), sum + nums[i], i + 1);
      }
    }
    dfs([], 0, 0);
    return res;
  };
}

export function firstMissingPositive(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      nums[i] = nums.length + 1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    const current = Math.abs(nums[i]);
    if (current <= nums.length) {
      nums[current - 1] = -Math.abs(nums[current - 1]);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return i + 1;
  }
  return nums.length + 1;
}
