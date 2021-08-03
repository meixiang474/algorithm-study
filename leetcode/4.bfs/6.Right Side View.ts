/**
 * @description leetcode 199
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

export default function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[] = [];
  while (queue.length > 0) {
    const [node, level] = queue.shift()!;
    res[level] = node.val;
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }
  return res;
}
