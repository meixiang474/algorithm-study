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
// todo

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
