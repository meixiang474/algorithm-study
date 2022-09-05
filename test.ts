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

// offer 53-I 53-II
export function search(nums: number[], target: number) {
  const floor = (nums: number[], target: number) => {
    let l = -1,
      r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor(l + (r - l + 1) / 2);
      if (nums[mid] < target) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const left = floor(nums, target);
  const right = ceil(nums, target);
  if (nums[target + 1] === target) {
    return right - left - 1;
  } else {
    return 0;
  }
}

export function missingNumber(nums: number[]) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// linked list
export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList<T = number> {
  dummyHead: ListNode<T>;
  size: number;
  constructor() {
    this.dummyHead = new ListNode(-1 as any);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  add(index: number, val: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(val);
    prev.next = next;
    this.size++;
  }
  addFirst(val: T) {
    return this.add(0, val);
  }
  addLast(val: T) {
    return this.add(this.size, val);
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
    const res = prev.next!.val;
    prev.next = prev.next!.next;
    this.size--;
    return res;
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
      }
      prev = prev.next;
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

export function removeElements(head: ListNode | null, val: number) {
  while (head && head.val === val) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}

export function removeElements1(head: ListNode | null, val: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function removeElements2(
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return head;
  const res = removeElements2(head.next, val);
  if (head && head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverse(head: ListNode | null) {
  let prev = null,
    current = head;
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
  let p1 = l1,
    p2 = l2,
    p3 = res;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    p3 = p3.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return res.next;
}

export function fn(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = fn(head.next);
  if (res && head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function fn1(head: ListNode | null) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
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

// 回文链表 todo
export function fn3(head: ListNode | null) {}

// hot 29-32
export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function minDistance(word1: string, word2: string) {
  const m = word1.length;
  const n = word2.length;
  if (m * n === 0) return m + n;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const leftAdd = dp[i][j - 1] + 1;
      const rightAdd = dp[i - 1][j] + 1;
      let leftChange = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) leftChange += 1;
      dp[i][j] = Math.min(leftAdd, rightAdd, leftChange);
    }
  }
  return dp[m][n];
}

export function sortColors(nums: number[]) {
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  let l = -1,
    r = nums.length;
  let i = 0;
  while (i < r) {
    if (nums[i] === 0) {
      l++;
      swap(nums, i, l);
      i++;
    } else if (nums[i] === 2) {
      r--;
      swap(nums, i, r);
    } else {
      i++;
    }
  }
}

export function minWindow(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let needType = map.size;
  let res = "";
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr)) {
      map.set(currentr, map.get(currentr)! - 1);
      if (map.get(currentr) === 0) {
        needType -= 1;
      }
    }

    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentl = s[l];
      if (map.has(currentl)) {
        map.set(currentl, map.get(currentl)! + 1);
        if (map.get(currentl) === 1) {
          needType += 1;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}

// practice week5 1 - 6
export type HeapType = "min" | "max";

export class Heap<T = number> {
  type: HeapType;
  heap: T[];
  constructor(type: HeapType = "min", compare?: (a: T, b: T) => boolean) {
    this.type = type;
    this.compare = compare || this.compare;
    this.heap = [];
  }
  compare(a: T, b: T) {
    return this.type === "min" ? a < b : a > b;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  insert(val: T) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }
  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  shiftUp(index: number) {
    if (index <= 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) throw new Error("error");
    if (this.heap.length === 1) return this.heap.pop()!;
    const res = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.shiftDown(0);
    return res;
  }
  shiftDown(index: number) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] != null &&
      this.compare(this.heap[leftIndex], this.heap[index])
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] != null &&
      this.compare(this.heap[rightIndex], this.heap[index])
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  peek() {
    if (this.heap.length === 0) throw new Error("error");
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

export function getLeastNumbers(arr: number[], k: number) {
  const heap = new Heap("max");
  for (let item of arr) {
    heap.insert(item);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.heap;
}

export function lastStoneWeight(stones: number[]) {
  const heap = new Heap("max");
  for (let item of stones) {
    heap.insert(item);
  }
  while (heap.size() > 1) {
    const first = heap.pop()!;
    const second = heap.pop()!;
    if (first > second) {
      heap.insert(first - second);
    }
  }
  if (heap.size() === 0) return 0;
  return heap.peek();
}

export class KthLargest {
  k: number;
  heap: Heap;
  constructor(nums: number[], k: number) {
    this.k = k;
    this.heap = new Heap();
    for (let item of nums) {
      this.heap.insert(item);
      if (this.heap.size() > k) this.heap.pop();
    }
  }
  add(val: number) {
    this.heap.insert(val);
    if (this.heap.size() > this.k) this.heap.pop();
    return this.heap.peek();
  }
}

export function kSmallestPairs(nums1: number[], nums2: number[], k: number) {
  const heap = new Heap<[number, number]>(
    "min",
    (a, b) => nums1[a[0]] + nums2[a[1]] < nums1[b[0]] + nums2[b[1]]
  );
  const res: number[][] = [];
  const set = new Set<string>();
  heap.insert([0, 0]);
  while (heap.size() > 0 && res.length < k) {
    const arr = heap.pop();
    if (set.has(arr.join("."))) continue;
    res.push([nums1[arr[0]], nums2[arr[1]]]);
    set.add(arr.join("."));
    if (arr[0] + 1 < nums1.length) heap.insert([arr[0] + 1, arr[1]]);
    if (arr[1] + 1 < nums2.length) heap.insert([arr[0], arr[1] + 1]);
  }
  return res;
}

export function findKthLargest(nums: number[], k: number) {
  const heap = new Heap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}
