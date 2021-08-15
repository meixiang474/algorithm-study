// leetcode 101

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
  const compare = (r1: TreeNode | null, r2: TreeNode | null) => {
    if (!r1 && !r2) return true;
    if (
      r1 &&
      r2 &&
      r1.val === r2.val &&
      compare(r1.left, r2.right) &&
      compare(r1.right, r2.left)
    ) {
      return true;
    }
    return false;
  };
  if (!root) return true;
  return compare(root.left, root.right);
}
