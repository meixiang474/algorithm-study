// 226
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
function invertTree(root: TreeNode | null) {
  const dfs = (node: TreeNode | null) => {
    if (node) {
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
      dfs(node.left);
      dfs(node.right);
    }
  };
  dfs(root);
  return root;
}
