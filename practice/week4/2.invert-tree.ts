// leetcode 226

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

export default function invertTree(root: TreeNode | null) {
  if (!root) return root;
  const dfs = (node: TreeNode) => {
    [node.left, node.right] = [node.right, node.left];
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
