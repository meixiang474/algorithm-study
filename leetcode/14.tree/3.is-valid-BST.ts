// leetcode 98

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

export default function isValidBST(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (node: TreeNode, floor: number, ceil: number): boolean => {
    if (node.val <= floor || node.val >= ceil) return false;
    return (
      (!node.left || dfs(node.left, floor, node.val)) &&
      (!node.right || dfs(node.right, node.val, ceil))
    );
  };
  return dfs(root, -Infinity, Infinity);
}
