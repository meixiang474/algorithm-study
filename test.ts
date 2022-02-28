// offer 15
export function harmmingWeight(n: number) {
  return n
    .toString(2)
    .split("")
    .reduce((memo, current) => {
      if (current === "1") memo++;
      return memo;
    }, 0);
}

// fenzhi donggui tanxin huisu
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

export function reverseTree(root: TreeNode | null) {
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
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  if (nums.length === 0) return 0;
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[nums.length];
}

export function rob1(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 1] + dp[i - 2] + nums[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

export function findContentChildren(g: number[], s: number[]) {
  s.sort((a, b) => a - b);
  g.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) {
      res++;
    }
  });
  return res;
}

export function maxProfit(profits: number[]) {
  let res = 0;
  for (let i = 0; i < profits.length; i++) {
    if (profits[i] < profits[i + 1]) {
      res += profits[i + 1] - profits[i];
    }
  }
  return res;
}

export function permute(nums: number[]) {
  const res: number[][] = [];
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach((item) => {
      if (!path.includes(item)) {
        backtrack(path.concat(item));
      }
    });
  };
  backtrack([]);
  return res;
}

export function subsets(nums: number[]) {
  const res: number[][] = [];
  const backtrack = (path: number[], start: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - start < length) {
      return;
    }
    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], 0, i);
  }
  return res;
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
