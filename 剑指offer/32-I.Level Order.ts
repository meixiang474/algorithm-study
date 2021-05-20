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
export default function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const queue = [root];
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current.val);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return res;
}
