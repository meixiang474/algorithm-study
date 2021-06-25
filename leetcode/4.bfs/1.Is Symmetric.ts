/**
 * @description leetcode 101
 */

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

export default (root: TreeNode | null) => {
  if (!root) return false;
  const dfs = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      dfs(p.left, q.right) &&
      dfs(p.right, q.left)
    ) {
      return true;
    }
    return false;
  };
  return dfs(root.left, root.right);
};
