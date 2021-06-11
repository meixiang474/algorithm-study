/**
 * @description leetcode 230
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

export default function kthSmallest(root: TreeNode | null, k: number): number {
  if (!root) return 0;
  let index = 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    index++;
    if (index === k) {
      res = node.val;
    }
    if (node.right) {
      dfs(node.right);
    }
  };
  dfs(root);
  return res;
}
