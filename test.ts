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

// leetcode daily 6-10
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

export function lengthLongestPath(input: string) {
  if (input.length === 0) return 0;
  let res = 0;
  const stack: number[] = [];
  let index = 0;
  while (index < input.length) {
    let depth = 0;
    while (index < input.length && input[index] === "\t") {
      depth++;
      index++;
    }
    let len = 0;
    let isFile = false;
    while (index < input.length && input[index] !== "\n") {
      if (input[index] === ".") isFile = true;
      len++;
      index++;
    }
    index++;
    len += stack[depth - 1] != null ? stack[depth - 1] + 1 : 0;
    if (isFile) {
      res = Math.max(res, len);
    } else {
      stack[depth] = len;
    }
  }
  return res;
}

export function toGoatLatin(sentence: string) {
  const arr = ["a", "e", "i", "o", "u"];
  return sentence
    .split(" ")
    .map((item, index) => {
      if (arr.includes(item[0].toLocaleLowerCase())) {
        return item + "ma" + "a".repeat(index + 1);
      } else {
        return item.slice(1) + item[0] + "ma" + "a".repeat(index + 1);
      }
    })
    .join(" ");
}

export function maxRotateFunction(nums: number[]) {
  const f0 = nums.reduce((memo, current, index) => {
    return (memo += current * index);
  }, 0);
  const sum = nums.reduce((a, b) => a + b);
  let res = f0;
  let f = f0;
  for (let i = 1; i < nums.length; i++) {
    f += sum - nums.length * nums[nums.length - i];
    res = Math.max(res, f);
  }
  return res;
}

export function binaryGap(n: number) {
  const str = n.toString(2);
  let prevIndex = -1;
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (current === "1") {
      if (prevIndex === -1) {
        prevIndex = i;
        continue;
      }
      res = Math.max(res, i - prevIndex);
      prevIndex = i;
    }
  }
  return res;
}

// practice week2
export class MyCircularQueue {
  data: (number | null)[]
  front: number;
  tail: number;
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null)
    this.front = this.tail = this.size = 0
  }
  isEmpty() {
    return this.size === 0
  }
  isFull() {
    return this.size === this.data.length
  }
  Front() {
    if(this.isEmpty()) return -1
    return this.data[this.front]
  }
  Rear() {
    if(this.isEmpty()) return -1
    
  }
}