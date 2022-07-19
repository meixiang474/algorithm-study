// leetcode 236

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

export default function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  let res = null;
  const dfs = (
    node: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
  ): boolean => {
    if (!node || !p || !q) return false;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    if (
      (left && right) ||
      ((node.val === p.val || node.val === q.val) && (left || right))
    ) {
      res = node;
    }
    return left || right || node.val === p.val || node.val === q.val;
  };
  dfs(root, p, q);
  return res;
}
