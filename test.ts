// 22

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function getKthFromEnd(head: ListNode | null, k: number) {
  if (!head) return null;
  let current: ListNode | null = head;
  const res: ListNode[] = [];
  while (current) {
    res.push(current);
    current = current.next;
  }
  return res[res.length - k];
}

// 24

export function reverse(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}

// set map
export function intersection(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function intersection1(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (const item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (const item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}

export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [map.get(rest), i];
    }
    map.set(current, i);
  }
}

export function fn(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
  }
  return res;
}

export function minWindow(s: string, t: string) {
  const map = new Map<string, number>();
  for (const item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let needType = map.size;
  let l = 0,
    r = 0;
  let res = "";
  while (r < s.length) {
    const current = s[r];
    if (map.has(current)) {
      map.set(current, map.get(current)! - 1);
      if (map.get(current) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (res.length === 0 || res.length > newRes.length) {
        res = newRes;
      }
      const currentL = s[l];
      if (map.has(currentL)) {
        map.set(currentL, map.get(currentL)! + 1);
        if (map.get(currentL) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}
