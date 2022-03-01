import { Heap } from "./practice/week5/1.heap";

// offer 16
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

// priority tree shell sort
export class PriorityQueue<T = number> {
  maxHeap: Heap<T>;
  constructor(compare?: (a: T, b: T) => boolean) {
    this.maxHeap = new Heap('max', compare)
  }
  getSize() {
    return this.maxHeap.size()
  }
  isEmpty() {
    return this.getSize() === 0
  }
  getFront() {
    return this.maxHeap.peek()
  }
  enqueue(item: T) {
    this.maxHeap.insert(item)
  }
  dequeue() {
    if(this.isEmpty()) throw new Error('error')
    return this.maxHeap.pop()
  }
}

// sliding window 1 - 5

export function longestSubstring(s: string) {
  let res = 0;
  const map = new Map<string, number>();
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

export function charactorReplacement(s: string, k: number) {
  const arr: number[] = new Array(26).fill(0);
  let max = 0,
    l = 0,
    r = 0;
  while (r < s.length) {
    arr[s[r].charCodeAt(0) - "A".charCodeAt(0)]++;
    max = Math.max(max, arr[s[r].charCodeAt(0) - "A".charCodeAt(0)]);
    if (r - l + 1 - max > k) {
      arr[s[l].charCodeAt(0) - "A".charCodeAt(0)]--;
      l++;
    }
    r++;
  }
  return r - l;
}

export function checkInclusion(s1: string, s2: string) {
  if (s1.length > s2.length) return false;
  const arr1: number[] = new Array(26).fill(0);
  const arr2: number[] = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    arr1[s1[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    arr2[s2[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  if (arr1.toString() === arr2.toString()) return true;
  for (let i = s1.length; i < s2.length; i++) {
    arr2[s2[i].charCodeAt(0) - "a".charCodeAt(0)]++;
    arr2[s2[i - s1.length].charCodeAt(0) - "a".charCodeAt(0)]--;
    if (arr1.toString() === arr2.toString()) return true;
  }
  return false;
}

export function maxTurbulence(nums: number[]) {
  let res = 1;
  let l = 0,
    r = 0;
  while (r < nums.length - 1) {
    const left = nums[l];
    const right = nums[r];
    if (l === r) {
      if (left === nums[l + 1]) {
        l++;
      }
      r++;
    } else {
      if (
        (right > nums[r - 1] && right > nums[r + 1]) ||
        (right < nums[r - 1] && right < nums[r + 1])
      ) {
        r++;
      } else {
        l = r;
      }
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
}

export function longestOnes(nums: number[], k: number) {
  let max = 0,
    l = 0,
    r = 0,
    onesInWindow = 0;
  while (r < nums.length) {
    const current = nums[r];
    if (current === 1) {
      onesInWindow++;
    }
    max = Math.max(max, onesInWindow);
    if (r - l + 1 - max > k) {
      const currentl = nums[l];
      if (currentl === 1) onesInWindow--;
      l++;
    }
    r++;
  }
  return r - l;
}
