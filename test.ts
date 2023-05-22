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
export function invertTree(root: TreeNode | null) {
  if (!root) return root;
  const dfs = (node: TreeNode) => {
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return root;
}

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  )
    return true;
  return false;
}

export function fn(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      isMirror(p.left, q.right) &&
      isMirror(p.right, q.left)
    )
      return true;
    return false;
  };
  return isMirror(root.left, root.right);
}

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  if (nums.length === 0) return 0;
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
}

export function rob2(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    if (nums.length === 0) return 0;
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1] + dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

export function findContentChildren(g: number[], s: number[]) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  for (let item of s) {
    if (item >= g[res]) res++;
  }
  return res;
}

export function maxProfit(prices: number[]) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1];
    }
  }
  return res;
}

export function permute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!path.includes(nums[i])) {
        dfs(path.concat(nums[i]));
      }
    }
  };
  dfs([]);
  return res;
}

export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], length: number, index: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), length, i + 1);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], i, 0);
  }
  return res;
}

// hot 29 - 32
export function climbStairs1(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function minDistance(word1: string, word2: string) {
  const m = word1.length;
  const n = word2.length;
  if (m * n === 0) return m + n;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const leftAdd = dp[i][j - 1] + 1;
      const rightAdd = dp[i - 1][j] + 1;
      let change = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) change++;
      dp[i][j] = Math.min(leftAdd, rightAdd, change);
    }
  }
  return dp[m][n];
}

export function sortColors(colors: number[]) {
  let l = -1,
    r = colors.length,
    i = 0;
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
  return colors;
}

export function minWindow(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let l = 0,
    r = 0,
    res = "";
  let needType = map.size;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr)) {
      map.set(currentr, map.get(currentr)! - 1);
      if (map.get(currentr) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const currentl = s[l];
      if (map.has(currentl)) {
        map.set(currentl, map.get(currentl)! + 1);
        if (map.get(currentl) === 1) needType++;
      }
      l++;
    }
    r++;
  }
  return res;
}

// sliding window 1-7
export function longestSubstring(s: string) {
  // todo
}