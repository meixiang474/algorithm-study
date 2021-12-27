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
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (stack.length > 0 || p) {
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

export function inorderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}
