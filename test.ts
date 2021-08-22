// 27
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

export function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (r1: TreeNode | null, r2: TreeNode | null) => {
    if (!r1 && !r2) return true;
    if (
      r1 &&
      r2 &&
      r1.val === r2.val &&
      isMirror(r1.left, r2.right) &&
      isMirror(r1.right, r2.left)
    ) {
      return true;
    }
    return false;
  };
  return isMirror(root.left, root.right);
}

// fenzhi donggui
export function invertTree(root: TreeNode | null) {
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

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[nums.length - 1];
}

export function rob2(nums: number[]) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(compute(nums.slice(0, -1)), compute(nums.slice(1)));
}
