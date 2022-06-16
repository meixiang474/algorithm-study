// offer 35
export class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: RandomListNode | null) {
  if (!head) return null;
  const map = new Map<RandomListNode, RandomListNode>();
  const dfs = (node: RandomListNode) => {
    const newNode = new RandomListNode(node.val);
    if (node.next && !map.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = node.next ? map.get(node.next)! : null;
    if (node.random && !map.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = node.random ? map.get(node.random)! : null;
  };
  dfs(head);
  return map.get(head);
}

// heap
export class MinHeap<T = number> {
  heap: T[];
  constructor(compare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare || this.compare;
  }
  compare(a: T, b: T) {
    return a < b;
  }
  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
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
  insert(val: T) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }
  shiftUp(index: number) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] != null &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }
  pop() {
    if (this.heap.length === 0) throw new Error("error");
    if (this.heap.length === 1) return this.heap.pop()!;
    const res = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
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

export function findKthLargest(nums: number[], k: number) {
  const heap = new MinHeap();
  for (let item of nums) {
    heap.insert(item);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

export function topKFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const heap = new MinHeap<{ value: number; key: number }>(
    (a, b) => a.value < b.value
  );
  for (let [key, value] of map) {
    heap.insert({ key, value });
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.heap.map((item) => item.key);
}

export function mergeKLists(lists: (ListNode | null)[]) {
  const heap = new MinHeap<ListNode>((a, b) => a.val < b.val);
  for (let item of lists) {
    if (item) heap.insert(item);
  }
  const res = new ListNode(-1);
  let current = res;
  while (heap.size()) {
    const next = heap.pop();
    current.next = next;
    current = current.next;
    if (next.next) heap.insert(next.next);
  }
  return res.next;
}

// hot 3 4
export function lengthOfLongestSubstring(s: string) {
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

export function findMedianSortedArray(nums1: number[], nums2: number[]) {
  const m = nums1.length;
  const n = nums2.length;
  const find = (nums1: number[], nums2: number[], k: number) => {
    let index1 = 0,
      index2 = 0;
    while (true) {
      if (index1 >= m) return nums2[index2 + k - 1];
      if (index2 >= n) return nums2[index1 + k - 1];
      const half = Math.floor(k / 2);
      const newIndex1 = Math.min(index1 + half, m) - 1;
      const newIndex2 = Math.min(index2 + half, n) - 1;
      if (nums1[newIndex1] <= nums2[newIndex2]) {
        k -= newIndex1 - index1 + 1;
        index1 = newIndex1 + 1;
      } else {
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  };
  if ((m + n) % 2 !== 0) {
    const k = Math.floor((m + n) / 2);
    return find(nums1, nums2, k + 1);
  } else {
    const k = Math.floor((m + n) / 2);
    return (find(nums1, nums2, k) + find(nums1, nums2, k + 1)) / 2;
  }
}

// leetcode string 6-10
export function groupAnagrams(string: string[]) {
  const map = new Map<string, string[]>();
  for (let item of string) {
    const key = item.split("").sort().join("");
    if (map.has(key)) {
      map.get(key)?.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  const res: string[][] = [];
  for (let [key, value] of map) {
    res.push(value);
  }
  return res;
}

export function simplifyPath(path: string) {
  const stack: string[] = [];
  const dirs = path.split("/");
  for (let item of dirs) {
    if (item === "." || item === "") continue;
    if (item === "..") {
      stack.pop();
      continue;
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}

export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp: number[] = [];
  dp[0] = s[0] === "0" ? 0 : 1;
  for (let i = 1; i < s.length; i++) {
    dp[i] =
      (s[i] === "0" ? 0 : dp[i - 1]) +
      (s[i - 1] === "0" || parseInt(s[i - 1] + s[i]) > 26
        ? 0
        : dp[i - 2] == null
        ? 1
        : dp[i - 2]);
  }
  return dp[s.length - 1];
}
