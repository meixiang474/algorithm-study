// leetcode 110

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
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
  };
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}
