export function isObject<T>(a: T) {
  return a && typeof a === 'object';
}

export function isEqual<T>(a: T, b: T) {
  if (!isObject(a) || !isObject(b)) return Object.is(a, b);
  const keysA = Object.keys(a as any);
  const keysB = Object.keys(b as any);
  if (keysA.length !== keysB.length) return false;
  for (let key in a) {
    if ((a as any).hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
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

export function selectionSort(data: number[]) {
  const res = [...data];
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

export function insertionSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let swapIndex = i;
    const current = res[swapIndex];
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function mergeSort(data: number[]) {
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
      } else if (temp[i] < temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
    }
  };

  const res = [...data];
  sortArr(res, 0, res.length - 1, [...res]);
  return res;
}

export function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) res++;
    }
  }
  return res;
}

export function reversePairs1(nums: number[]) {
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
        res += mid - i + 1;
        j++;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  let res = 0;
  sortArr([...nums], 0, nums.length - 1, [...nums]);
  return res;
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val < p2.val) {
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

export function quickSort(nums: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  };

  const swap = (arr: number[], i: number, j: number) => [arr[i], arr[j]];
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
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
  const res = [...nums];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(nums: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      left = l,
      right = r + 1;
    while (i < right) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[i] > arr[l]) {
        right--;
        swap(arr, right, i);
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
  const res = [...nums];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function sortColors(nums: number[]) {
  const res = [...nums];
  const swap = (arr: number[], i: number, j: number) => [arr[i], arr[j]];
  let i = 0,
    left = -1,
    right = res.length;
  while (i < right) {
    if (i === 0) {
      left++;
      swap(res, left, i);
      i++;
    } else if (i === 2) {
      right--;
      swap(res, right, i);
    } else {
      i++;
    }
  }
  return res;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return arr[k];
    const p = partition(arr, l, r);
    if (p === k) {
      return p;
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
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
      if (i <= j && arr[i] < arr[l]) {
        i++;
      }
      if (i <= j && arr[j] > arr[l]) {
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
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums.slice(0);
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, p);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
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
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set('(', ')');
  map.set('[', ']');
  map.set('{', '}');
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

export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.items.length === 0) throw new Error('error');
    const res = this.items.pop()!;
    if (this.queue[0] === res) this.queue.shift();
    return res;
  }
  top() {
    if (this.items.length === 0) throw new Error('error');
    return this.items[this.items.length - 1];
  }
  min() {
    if (this.items.length === 0) throw new Error('error');
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
    if (this.items.length === this.maxSize) return;
    this.items.push(item);
  }
  pop() {
    if (this.items.length === 0) throw new Error('error');
    return this.items.pop()!;
  }
  inc(k: number, val: number) {
    for (let i = 0; i < k; i++) {
      this.items[i] += val;
    }
  }
}

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

export function preorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    res.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return res;
}

export function decToBi(num: number) {
  if (num === 0) return 0;
  const arr: number[] = [];
  while (num) {
    arr.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(arr.join(''));
}

export class StackBasedOnQueue {
  queue: number[];
  constructor() {
    this.queue = [];
  }
  getSize() {
    return this.queue.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.queue.push(item);
  }
  pop() {
    if (this.queue.length === 0) throw new Error('error');
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
    return this.queue.shift()!;
  }
  peek() {
    if (this.isEmpty()) throw new Error('error');
    const res = this.pop();
    this.push(res);
    return res;
  }
}

export class QueueBasedOnStack {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  getSize() {
    return this.stack1.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  enqueue(item: number) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error('error');
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
  getFront() {
    if (this.isEmpty()) throw new Error('error');
    const res = this.dequeue();
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop()!);
    }
    this.stack1.push(res);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
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
  if (head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverse(head: ListNode | null) {
  let prev: ListNode | null = null,
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
    p3.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return res.next;
}

export function removeDuplicates(head: ListNode | null) {
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

export function removeDuplicates1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = removeDuplicates1(head.next);
  if (res && head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function isCircle(head: ListNode | null) {
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

export function isSymmetric(head: ListNode | null) {
  if(!head || !head.next) return true;
  let slow: ListNode | null = head, fast: ListNode | null = head;
  while(slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if(fast) {
    slow = slow!.next;
  }
  let prev = null, current = slow;
  while(current) {
    // todo
    
  }
}