export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 45 46
export function minNumber(nums: number[]) {
  return nums
    .map((v) => v + "")
    .sort((a, b) => parseFloat(a + b) - parseFloat(b + 1))
    .join("");
}

export function translateNum(num: number) {
  const numStr = num.toString();
  const dp = [1, 1];
  for (let i = 2; i <= numStr.length; i++) {
    if (
      parseInt(numStr.slice(i - 2, i)) > 25 ||
      parseInt(numStr.slice(i - 2, i)) < 10
    ) {
      dp[i] = dp[i - 1];
    } else {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
  }
  return dp[numStr.length];
}

// search sort
export function isObject(obj: any) {
  return obj && typeof obj === "object";
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const lengthA = Object.keys(a).length;
  const lengthB = Object.keys(b).length;
  if (lengthA !== lengthB) return false;
  for (let key in a) {
    if (a.hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T>(arr: T[], data: T) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], data)) return i;
  }
  return -1;
}

export function selectionSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) swap(res, minIndex, i);
  }
  return res;
}

export function insertionSort(arr: number[]) {
  const res = [...arr];
  for (let i = 0; i < res.length; i++) {
    const current = res[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) res[swapIndex] = current;
  }
  return res;
}

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j] > res[j + 1]) {
        swap(res, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// hot 17-20
export function search(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] >= nums[l]) {
      if (target === nums[l]) return l;
      if (target > nums[l] && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (target === nums[r]) return r;
      if (target > nums[mid] && target < nums[r]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}

export function searchRange(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  const res = [-1, -1];
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid - 1] === target) {
        r = mid - 1;
      } else {
        res[0] = mid;
        break;
      }
    }
  }
  (l = 0), (r = nums.length - 1);
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      if (nums[mid + 1] === target) {
        l = mid + 1;
      } else {
        res[1] = mid;
        break;
      }
    }
  }
  return res;
}

export function combinationSum(candidates: number[], target: number) {
  if (candidates.length === 0) return [];
  const res: number[][] = [];
  const dfs = (path: number[], index: number, sum: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    dfs(path.concat(candidates[index]), index, sum + candidates[index]);
    dfs(path, index + 1, sum);
  };
  dfs([], 0, 0);
  return res;
}

export function trap(nums: number[]) {
  const left: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    left[i] = Math.max(left[i - 1], nums[i]);
  }
  const right: number[] = [];
  right[nums.length - 1] = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], nums[i]);
  }
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res += Math.min(left[i], right[i]) - nums[i];
  }
  return res;
}

// leetcode daily 6-10ss
export function shortestToChar(s: string, c: string) {
  if (s.length === 0 || c.length === 0) return [];
  const res: number[] = [];
  let cIndex = -Infinity;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) cIndex = i;
    res[i] = i - cIndex;
  }
  cIndex = Infinity;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === c) cIndex = i;
    res[i] = Math.min(res[i], cIndex - i);
  }
  return res;
}

// practice week1

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

export function removeDuplicates1(head: ListNode | null) {
  while (head && head.next && head.val === head.next.val) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}

export function removeDuplicates2(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = removeDuplicates2(head.next);
  if (res && head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prevNode = dummyHead;
  for (let i = 0; i < left - 1; i++) {
    prevNode = prevNode.next!;
  }
  const leftNode = prevNode.next;
  let rightNode = prevNode;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next!;
  }
  const nextNode = rightNode.next;
  rightNode.next = null;
  let prev = null;
  let current = leftNode;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  prevNode.next = rightNode;
  leftNode!.next = nextNode;
  return dummyHead.next;
}

export function rotateRight(head: ListNode, k: number) {
  if (!head || !head.next || k === 0) return head;
  let current = head;
  let count = 1;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  let prev = head;
  k = count - (k % count);
  for (let i = 0; i < k - 1; i++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}

export function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const nextHead = head.next;
  const res = swapPairs(nextHead.next);
  head.next = res;
  nextHead.next = head;
  return nextHead;
}

export function removeFromEnd(head: ListNode | null, k: number) {
  if (!head) return head;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  const stack: ListNode[] = [];
  let current: ListNode | null = dummyHead;
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < k; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  prev.next = prev.next?.next || null;
  return dummyHead.next;
}
