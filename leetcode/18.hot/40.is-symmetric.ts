// leetcode 101

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

export default function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
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
}
