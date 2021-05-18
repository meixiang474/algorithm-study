// 111
export {};
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val?: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left;
    this.right = right;
  }
}
function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  let queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return 0;
}
