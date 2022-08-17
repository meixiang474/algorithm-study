// leetcode 617

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

export default function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
) {
  if (!root1) return root2;
  if (!root2) return root1;
  const res = new TreeNode(root1.val + root2.val);
  res.left = mergeTrees(root1.left, root2.left);
  res.right = mergeTrees(root1.right, root2.right);
  return res;
}
