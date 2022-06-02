// leetcode 450

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

function removeMinNode(node: TreeNode): {
  res: TreeNode;
  next: TreeNode | null;
} {
  if (!node.left) {
    return {
      res: node,
      next: node.right,
    };
  }
  const { res, next } = removeMinNode(node.left);
  node.left = next;
  return {
    res,
    next: node,
  };
}

export default function deleteNode(
  root: TreeNode | null,
  key: number
): TreeNode | null {
  if (!root) return null;
  if (root.val > key) {
    root.left = deleteNode(root.left, key);
    return root;
  }
  if (root.val < key) {
    root.right = deleteNode(root.right, key);
    return root;
  }
  if (!root.left) {
    return root.right;
  }
  if (!root.right) {
    return root.left;
  }
  const { next, res } = removeMinNode(root.right);
  res.left = root.left;
  res.right = next;
  return res;
}
