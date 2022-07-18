// leetcode 226

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

export default function invertTree(root: TreeNode | null) {
  if (!root) return null;
  const dfs = (node: TreeNode) => {
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return root;
}
