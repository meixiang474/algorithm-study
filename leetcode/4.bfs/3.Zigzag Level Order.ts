/**
 * @description leetcode 103
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

export default function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [node, level] = queue.shift()!;
    let arr = res[level];
    if (!arr) arr = res[level] = [];
    if (level % 2 === 0) {
      arr.push(node.val);
    } else {
      arr.unshift(node.val);
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
