// leetcode 112

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

export default function hasPathSum(root: TreeNode | null, targetSum: number) {
  if (!root) {
    return false;
  }
  let res = false;
  const dfs = (node: TreeNode, sum: number) => {
    if (!node.left && !node.right && sum === targetSum) {
      res = true;
      return;
    }
    if (node.left) {
      dfs(node.left, node.left.val + sum);
    }
    if (node.right) {
      dfs(node.right, node.right.val + sum);
    }
  };
  dfs(root, root.val);
  return res;
}
