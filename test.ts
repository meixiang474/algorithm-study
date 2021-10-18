// offer 52
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  const map = new Map<ListNode, boolean>();
  let prevA: ListNode | null = headA;
  while (prevA) {
    map.set(prevA, true);
    prevA = prevA.next;
  }
  let prevB: ListNode | null = headB;
  while (prevB) {
    if (map.has(prevB)) {
      return prevB;
    }
    prevB = prevB.next;
  }
  return null;
}

// leetcode array 39
export function combinationSum(nums: number[], target: number) {
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) return;
    if (index >= nums.length) return;
    backtrack(path, sum, index + 1);
    backtrack([...path, nums[index]], sum + nums[index], index);
  };
  backtrack([], 0, 0);
  return res;
}

// merge sort

export function mergeSort(arr: number[]) {
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
        j++;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  const res = [...arr];
  sortArr(res, 0, res.length - 1, [...arr]);
  return res;
}

export function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > current) res++;
    }
  }
  return res;
}

export function reversePairs2(nums: number[]) {
  let res = 0;
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
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        res += mid - i + 1;
        j++;
      }
    }
  };
  sortArr([...nums], 0, nums.length - 1, [...nums]);
  return res;
}

export function mergeList(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1)
  let p = res
  let p1 = l1
  let p2 = l2
  while(p1 && p2) {
    if(p1.val <= p2.val) {
      p.next = p1
      p1 = p1.next
    }else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }
  if(p1) {
    p.next = p1
  }
  if(p2) {
    p.next = p2
  }
  return res.next
}