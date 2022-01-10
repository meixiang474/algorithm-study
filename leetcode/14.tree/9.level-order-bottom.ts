// leetcode 107

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

export default function levelOrderBottom(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  let currentLevel = -1;
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    if (currentLevel === level) {
      res[0].push(current.val);
    } else {
      const arr: number[] = [];
      arr.push(current.val);
      res.unshift(arr);
      currentLevel = level
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}
