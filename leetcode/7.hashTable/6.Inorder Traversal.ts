// leetcode 94

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

export default function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    res.push(node.val);
    if (node.right) {
      dfs(node.right);
    }
  };
  dfs(root);
  return res;
}
