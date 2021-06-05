/**
 * @description 剑指offer 54
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

export default function kthLargest(root: TreeNode | null, k: number): number {
  if (!root) return -Infinity;
  let res = -Infinity;
  let level = 0;
  const dfs = (node: TreeNode) => {
    if (node.right) {
      dfs(node.right);
    }
    level++;
    if (level === k) {
      res = node.val;
      return;
    }
    if (node.left) {
      dfs(node.left);
    }
  };
  dfs(root);
  return res;
}
