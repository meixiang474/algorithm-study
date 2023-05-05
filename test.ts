import { Heap } from "./practice/week5/1.heap";
import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 30 31
export class MinStack {
  queue: number[];
  stack: number[];
  constructor() {
    this.stack = [];
    this.queue = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.stack.length === 0) throw new Error("error");
    const res = this.stack.pop();
    if (res === this.queue[0]) this.queue.shift();
    return res;
  }
  top() {
    if (this.stack.length === 0) throw new Error("error");
    return this.stack[this.stack.length - 1];
  }
  min() {
    if (this.stack.length === 0) throw new Error("error");
    return this.queue[0];
  }
}

export function validateStackSequence(pushed: number[], popped: number[]) {
  const stack: number[] = [];
  let i = 0;
  for (let item of pushed) {
    stack.push(item);
    while (stack.length > 0 && stack[stack.length - 1] === pushed[i]) {
      stack.pop();
      i++;
    }
  }
  return stack.length === 0;
}

// graph
export function bfs(
  graph: Record<number, number[]>,
  visited: Set<number>,
  node: number
) {
  const queue: number[] = [node];
  visited.add(node);
  const res: number[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
      }
    });
  }
  return res;
}

export function dfs(graph: Record<number, number[]>, visited: Set<number>, node: number) {
  // todo
}

// hot 17 - 20
export function search(nums: number[], target: number) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] >= nums[l]) {
      if (nums[l] === target) return l;
      if (target > nums[l] && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[r] === target) return r;
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
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= candidates.length || sum > target) return;
    dfs(path.concat(candidates[index]), sum + candidates[index], index);
    dfs(path, sum, index + 1);
  };
  dfs([], 0, 0);
  return res;
}

export function trap(heights: number[]) {
  const left = [heights[0]];
  for (let i = 1; i < heights.length; i++) {
    left[i] = Math.max(left[i - 1], heights[i]);
  }
  const right = [heights[heights.length - 1]];
  for (let i = heights.length - 2; i >= 0; i--) {
    right[i] = Math.max(heights[i], right[i + 1]);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res += Math.min(left[i], right[i]) - heights[i];
  }
  return res;
}

// hashtable 1-5
export function twoSum1(nums: number[], target: number) {
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

export function longestSubstring(s: string) {
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
    r++;
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && nums[i - 1] === current) continue;
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
      if (currentj + nums[j + 1] + nums[j + 2] + nums[j + 3] > target) break;
      if (
        currentj +
          nums[nums.length - 1] +
          nums[nums.length - 2] +
          nums[nums.length - 3] <
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
          res.push([current, currentj, currentl, currentr]);
          while (l < r) {
            l++;
            if (nums[l] !== currentl) continue;
          }
          while (l < r) {
            r--;
            if (nums[r] !== currentr) continue;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) continue;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) continue;
          }
        }
      }
    }
  }
  return res;
}

export function isValidSudoku(board: string[][]) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const rows: number[][] = new Array(m).fill(0).map(() => new Array(9).fill(0));
  const cols: number[][] = new Array(n).fill(0).map(() => new Array(9).fill(0));
  const subs: number[][][] = new Array(3)
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const current = board[r][c];
      if (current !== ".") {
        const index = parseInt(current);
        rows[r][index]++;
        cols[c][index]++;
        subs[Math.floor(r / 3)][Math.floor(c / 3)][index]++;
        if (
          rows[r][index] > 1 ||
          cols[c][index] > 1 ||
          subs[Math.floor(r / 3)][Math.floor(c / 3)][index] > 1
        )
          return false;
      }
    }
  }
  return true;
}

export function groupAnagrams(strs: string[]) {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const key = item.split("").sort().join("");
    const arr = map.has(key) ? map.get(key)! : [];
    arr.push(item);
    if (!map.has(key)) map.set(key, arr);
  }
  const res: string[][] = [];
  for (let [, value] of map) {
    res.push(value);
  }
  return res;
}
