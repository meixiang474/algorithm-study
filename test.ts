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

// offer 32-III 33
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) arr.push(current.val);
    else arr.unshift(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function verifyPostorder(postorder: number[]): boolean {
  const upper = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const isTree = (postorder: number[], rootVal: number, rightIndex: number) => {
    const left = postorder.slice(0, rightIndex);
    const right = postorder.slice(rightIndex, -1);
    return (
      left.every((item) => item < rootVal) &&
      right.every((item) => item > rootVal)
    );
  };
  const rootVal = postorder[postorder.length - 1];
  const rightIndex = upper(postorder.slice(0, -1), rootVal);
  const flag = isTree(postorder, rootVal, rightIndex);
  if (flag) {
    return (
      verifyPostorder(postorder.slice(0, rightIndex)) &&
      verifyPostorder(postorder.slice(rightIndex, -1))
    );
  } else {
    return false;
  }
}

// fenzhi donggui tanxin huisu
// todo

// hot 25 - 28
export function canJump(nums: number[]) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= max) {
      max = Math.max(max, nums[i] + i);
      if (max >= nums.length - 1) {
        return true;
      }
    }
  }
  return false;
}

export function mergeField(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  let prevEnd = -Infinity;
  const res: number[][] = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push(intervals[i]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}

export function uniquePaths(m: number, n: number) {
  const map = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    map[r][0] = 1;
  }
  for (let c = 0; c < n; c++) {
    map[0][c] = 1;
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      map[r][c] = map[r - 1][c] + map[r][c - 1];
    }
  }
  return map[m - 1][n - 1];
}

export function minPathSum(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = grid[0][0];
  for (let r = 1; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0];
  }
  for (let c = 1; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c];
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[m - 1][n - 1];
}

// math 1-5
export function addTwo(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) p3.next = new ListNode(carry);
  return res.next;
}

export function myPow(x: number, n: number) {
  const isNegative = x < 0;
  n = Math.abs(n);
  const compute = (x: number, n: number): number => {
    if (n === 0) return 1;
    const res = compute(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNegative ? 1 / compute(x, n) : compute(x, n);
}

export function getPermutation(n: number, k: number) {
  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum = groupNum * i;
  }
  const dfs = (path: number[]): string => {
    if (path.length === n) return path.join("");
    groupNum = groupNum / (n - path.length);
    for (let i = 1; i <= n; i++) {
      if (path.includes(i)) continue;
      if (k > groupNum) {
        k -= groupNum;
      } else {
        return dfs(path.concat(i));
      }
    }
    return "";
  };
  return dfs([]);
}

export function sqrt(x: number) {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 > x) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }
  return l;
}

export function isHappy(n: number) {
  const compute = (n: number) =>
    n
      .toString()
      .split("")
      .reduce((memo, current) => memo + parseInt(current) ** 2, 0);
  const set = new Set<number>();
  while (!set.has(n)) {
    if (n === 1) return true;
    set.add(n);
    n = compute(n);
  }
  return false;
}
