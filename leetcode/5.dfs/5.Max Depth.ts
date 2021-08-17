// leetcode 104

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

export default function maxDepth(root: TreeNode | null) {
  let res = 0;
  const dfs = (node: TreeNode | null, level: number) => {
    if (!node) return;
    if (!node.left && !node.right) {
      res = Math.max(res, level);
    }
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}
