// 104
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
function maxDepth(root: TreeNode | null): number {
  let res = 0;
  const dfs = (node: TreeNode | null, level: number) => {
    if (!node) {
      return;
    }
    res = Math.max(res, level);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}
