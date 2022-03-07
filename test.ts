import { Heap } from "./practice/week5/1.heap";

// offer 17
export function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 0; i <= end; i++) {
    res.push(i);
  }
  return res;
}

// segment tree


// sort 1 - 5

export function mergeField(fields: number[][]) {
  fields.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < fields.length; i++) {
    const [start, end] = fields[i];
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function insertField(intervals: number[][], newInterval: number[]) {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function sortColors(colors: number[]) {
  let l = -1,
    i = 0,
    r = colors.length;
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(colors, l, i);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(colors, r, i);
    } else {
      i++;
    }
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function insertionSortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let lastSorted = head;
  let current: ListNode | null = head.next;
  while (current) {
    if (lastSorted.val <= current.val) {
      lastSorted = current;
      current = current.next;
    } else {
      let prev = dummyHead;
      while (prev.next) {
        if (prev.next.val > current.val) break;
        prev = prev.next;
      }
      const insertNext = prev.next;
      const next: ListNode | null = current.next;
      prev.next = current;
      current.next = insertNext;
      current = next;
      lastSorted.next = next;
    }
  }
  return dummyHead.next;
}

export function sortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow = head,
    fast = head;
  while (slow && fast && fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const next = slow.next;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
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
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return l3.next;
}
