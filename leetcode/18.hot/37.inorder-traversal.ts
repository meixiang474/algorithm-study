// leetcode 94

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

export default function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  let p: TreeNode | null = root;
  const stack: TreeNode[] = [];
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}
