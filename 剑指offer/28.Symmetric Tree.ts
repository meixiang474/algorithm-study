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

export default function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (r1: TreeNode | null, r2: TreeNode | null) => {
    if (!r1 && !r2) return true;
    if (
      r1 &&
      r2 &&
      r1.val === r2.val &&
      isMirror(r1.left, r2.right) &&
      isMirror(r1.right, r2.left)
    ) {
      return true;
    }
    return false;
  };
  return isMirror(root.left, root.right);
}
