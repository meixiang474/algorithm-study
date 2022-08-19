// leetcode 156

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

export default function upsideDownBinaryTree(root: TreeNode | null) {
  if (!root) return root;
  let head: TreeNode | null = null;
  const dfs = (node: TreeNode, prev: TreeNode | null) => {
    if (node.left) dfs(node.left, node);
    if (!head) {
      head = node;
    }
    if (prev) {
      prev.left = null;
      node.left = prev.right;
      prev.right = null;
      node.right = prev;
    }
  };
  dfs(root, null);
  return head;
}
