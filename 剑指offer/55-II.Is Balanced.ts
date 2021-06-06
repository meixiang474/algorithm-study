/**
 * @description 剑指offer 55-II
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

export default function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  const depth = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(depth(node.left), depth(node.right)) + 1;
  };
  return (
    Math.abs(depth(root.left) - depth(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}
