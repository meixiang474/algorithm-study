// 112
export {};
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val?: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left;
    this.right = right;
  }
}
function hasPathSum(root: TreeNode | null, sum: number): boolean {
  if (!root) return false;
  let res = false;
  const dfs = (node: TreeNode, s: number) => {
    if (!node.left && !node.right && s === sum) {
      res = true;
    }
    if (node.left) {
      dfs(node.left, node.left.val + s);
    }
    if (node.right) {
      dfs(node.right, node.right.val + s);
    }
  };
  dfs(root, root.val);
  return res;
}
