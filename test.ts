// offer 36
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

export function treeToDoublyList(root: TreeNode | null) {
  if (!root) return root;
  const res: TreeNode[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node);
    if (node.right) dfs(node.right);
  };
  let head: TreeNode | null = null;
  let tail: TreeNode | null = null;
  for (let i = 0; i < res.length; i++) {
    const current = res[i];
    if (!tail) {
      head = tail = current;
      tail.right = head;
      head.left = tail;
    } else {
      const prev = tail;
      tail.right = current;
      tail = tail.right;
      tail.right = head;
      tail.left = prev;
      head!.left = tail;
    }
  }
  return head;
}

// fenzhi donggui tanxin huisu
export function invertTree(root: TreeNode | null) {
  if (!root) return null;
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

export function isSameTree(p1: TreeNode | null, p2: TreeNode | null) {
  if (!p1 && !p2) return true;
  if (
    p1 &&
    p2 &&
    p1.val === p2.val &&
    isSameTree(p1.left, p2.left) &&
    isSameTree(p1.right, p2.right)
  )
    return true;
  return false;
}

export function fn(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (p1: TreeNode | null, p2: TreeNode | null) => {
    if (!p1 && !p2) return true;
    if (
      p1 &&
      p2 &&
      p1.val === p2.val &&
      isMirror(p1.left, p2.right) &&
      isMirror(p1.right, p2.left)
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

export function rob1(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    if (nums.length === 0) return 0;
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

export function findContentChildren(g: number[], s: number[]) {
  s.sort((a, b) => a - b);
  g.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) res++;
  });
  return res;
}

export function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}

// hot 5 6
export function longestPalindrome(s: string) {
  if (s.length === 1) return s;
  const dp: boolean[][] = Array.from({ length: s.length }, () =>
    new Array(s.length).fill(false)
  );
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }
  let maxLength = 1;
  let startIndex = 0;
  for (let l = 2; l <= s.length; l++) {
    for (let left = 0; left < s.length - l + 1; left++) {
      const right = left + l - 1;
      if (s[left] !== s[right]) {
        dp[left][right] = false;
      } else {
        if (right - left + 1 <= 3) {
          dp[left][right] = true;
        } else {
          dp[left][right] = dp[left + 1][right - 1];
        }
      }
      if (dp[left][right]) {
        maxLength = l;
        startIndex = left;
      }
    }
  }
  return s.slice(startIndex, startIndex + maxLength);
}

export function isMatch(s: string, p: string): boolean {
  if (p.length === 0) return s.length === 0;
  let match = false;
  if (s.length > 0 && (p[0] === s[0] || p[0] === ".")) {
    match = true;
  }
  if (p.length > 1 && p[1] === "*") {
    return isMatch(s, p.slice(2)) || (match && isMatch(s.slice(1), p));
  }
  return match && isMatch(s.slice(1), p.slice(1));
}

// leetcode tree 6-10
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function zigzagLevelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}
