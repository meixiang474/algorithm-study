import { Heap } from "./practice/week5/1.heap";

// offer 36
export function permutation(s: string) {
  const arr = s.split("").sort();
  const map = new Map<number, boolean>();
  const res: string[] = [];
  const dfs = (path: string) => {
    if (path.length === s.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (i > 0 && arr[i] === arr[i - 1] && map.has(i - 1)) continue;
      if (!map.has(i)) {
        map.set(i, true);
        dfs(path + arr[i]);
        map.delete(i);
      }
    }
  };
  dfs("");
  return res;
}

// priority-queue shell-sort
export class PriorityQueue<T = number> {
  maxHeap: Heap<T>;
  constructor(compare?: (a: T, b: T) => boolean) {
    this.maxHeap = new Heap("max", compare);
  }
  getSize() {
    return this.maxHeap.size();
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  getFront() {
    return this.maxHeap.peek();
  }
  enqueue(item: T) {
    this.maxHeap.insert(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    return this.maxHeap.pop();
  }
}

export function shellSort(nums: number[]) {
  const res: number[] = [...nums];
  let h = Math.floor(res.length / 2);
  while (h < res.length) {
    h = h * 3 + 1;
  }
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; h -= h) {
        if (res[j] > current) {
          res[j + h] = res[j];
          swapIndex = j;
        } else {
          break;
        }
      }
      if (swapIndex !== i) res[swapIndex] = current;
    }
    h = Math.floor(h / 3);
  }
  return res;
}

// hot 7 8
export function maxArea(heights: number[]) {
  let l = 0,
    r = heights.length;
  let res = 0;
  while (l < r) {
    res = Math.max(res, Math.min(heights[l], heights[r]) * (r - l));
    if (heights[l] > heights[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;
    if (nums[i] + nums[nums.length - 1] + nums[nums.length - 2] < 0) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = nums[i] + currentl + currentr;
      if (sum === 0) {
        res.push([nums[i], currentl, currentr]);
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

// leetcode two-pointers 6-10
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number) {
  if (!head) return null;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let p: ListNode | null = dummyHead;
  while (p) {
    stack.push(p);
    p = p.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
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

export function strStr(hayStack: string, needle: string) {
  if (hayStack.length === 0) return -1;
  if (hayStack.length < needle.length) return -1;
  let res = -1;
  for (let i = 0; i < hayStack.length; i++) {
    const current = hayStack[i];
    if (current === needle[0]) {
      let flag = true;
      for (let index = i + 1; index < needle.length + i; index++) {
        if (hayStack[index] !== needle[index - i]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = i;
        break;
      }
    }
  }
  return res;
}

export function rotateRight(head: ListNode | null, k: number) {
  if (!head || !head.next || k === 0) return head;
  let count = 0;
  let p: ListNode | null = head;
  let prev: ListNode | null = null;
  while (p) {
    count++;
    prev = p;
    p = p.next;
  }
  prev!.next = head;
  k = count - (k % count);
  prev = head;
  for (let i = 0; i < k - 1; i++) {
    prev = prev!.next;
  }
  const res = prev!.next;
  prev!.next = null;
  return res;
}
