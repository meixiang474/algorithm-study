// leetcode 124

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

export default function maxPathSum(root: TreeNode | null) {
  if (!root) return 0;
  let res = -Infinity;
  const dfs = (node: TreeNode): number => {
    const left = Math.max(node.left ? dfs(node.left) : 0, 0);
    const right = Math.max(node.right ? dfs(node.right) : 0, 0);
    res = Math.max(res, node.val + left + right);
    return Math.max(left, right, 0) + node.val;
  };
  dfs(root);
  return res;
}
