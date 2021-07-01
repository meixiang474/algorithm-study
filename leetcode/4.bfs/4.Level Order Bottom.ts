/**
 * @description leetcode 107
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

export default function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  let currentLevel = -1;
  const res: number[][] = [];
  while (queue.length > 0) {
    const [node, level] = queue.shift()!;
    if (level === currentLevel) {
      const arr = res[0];
      arr.push(node.val);
    } else {
      const arr = [];
      arr.push(node.val);
      res.unshift(arr);
      currentLevel = level;
    }
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }
  return res;
}
