/**
 * @description leetcode 222
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

export default function countNodes(root: TreeNode | null): number {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    res++;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}
