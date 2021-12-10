// leetcode 145

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

export default function preOrderTraversal(root: TreeNode | null) {
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let prevRight: TreeNode | null = null;
  let p = root;
  while (p && stack.length > 0) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

export function preOrderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
    res.push(node.val);
  };
  dfs(root);
  return res;
}
