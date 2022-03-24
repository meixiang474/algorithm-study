// offer 23
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}

export function reverseList1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let prev = null,
    current: ListNode | null = head;
  while (current) {
    const next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// search sort
export function isObject<T extends any>(obj: T) {
  return typeof obj === "object" && obj;
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key in a) {
    if (a.hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T extends any>(arr: T[], target: T) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], target)) return i;
  }
  return -1;
}

export function selectionSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(arr: number[]) {
  const res = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let swapIndex = i;
    let current = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > current) {
        arr[j + 1] = arr[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      arr[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j + 1, j);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// two-ponters 1-5

export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = l;
  let res = 0;
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

export function maxArea(nums: number[]) {
  let res = 0;
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const currentl = nums[l];
    const currentr = nums[r];
    res = Math.max(res, Math.min(currentl, currentr) * (r - l));
    if (currentl > currentr) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: [number, number, number][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (current > 0) break;
    if (i > 0 && nums[i - 1] === current) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = currentl + currentr + current;
      if (sum === 0) {
        res.push([currentl, currentr, current]);
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
  nums.sort((a, b) => a - b);
  let res = 0;
  let diff = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    let isEqual = false;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = currentl + currentr + current;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        res = sum;
        diff = newDiff;
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        }
      }
      if (isEqual) break;
    }
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: [number, number, number, number][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (j > i + 1 && currentj === nums[j - 1]) continue;
      if (current + currentj + nums[j + 1] + nums[j + 2] > target) break;
      if (
        current + currentj + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const currentl = nums[l];
        const currentr = nums[r];
        const sum = currentl + currentr + current + currentj;
        if (sum === target) {
          res.push([currentl, currentr, currentj, current]);
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        }
      }
    }
  }
  return res;
}
