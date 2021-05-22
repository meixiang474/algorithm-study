/**
 * @description 剑指offer 34
 */

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

export default function pathSum(
  root: TreeNode | null,
  target: number
): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const dfs = (node: TreeNode, path: number[], sum: number) => {
    if (sum === target && !node.left && !node.right) {
      res.push(path);
      return;
    }
    if (node.left) {
      dfs(node.left, path.concat(node.left.val), sum + node.left.val);
    }
    if (node.right) {
      dfs(node.right, path.concat(node.right.val), sum + node.right.val);
    }
  };
  dfs(root, [root.val], root.val);
  return res;
}
