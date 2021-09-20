// offer 46
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

// leetcode array 11

export default function maxArea(height: number[]) {
  let l = 0,
    r = height.length - 1;
  let res = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    res = Math.max(res, area);
    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

// fenzhi donggui

class TreeNode {
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
    if (node.left) {
      dfs(node.left);
    }
    if (node.right) {
      dfs(node.right);
    }
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
  ) {
    return true;
  }
  return false;
}

export function isMirrorTree(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (l: TreeNode | null, r: TreeNode | null) => {
    if (!l && !r) return true;
    if (
      l &&
      r &&
      l.val === r.val &&
      isMirror(l.left, r.right) &&
      isMirror(l.right, r.left)
    ) {
      return true;
    }
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
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[nums.length];
}

export function rob1(nums: number[]) {
  if (nums.length === 1) {
    return nums[0];
  }
  const compute = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}
