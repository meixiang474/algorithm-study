// 102
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
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  let res: number[][] = [];
  let queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    let [current, level] = queue.shift()!;
    if (!res[level]) {
      res[level] = [current.val];
    } else {
      res[level].push(current.val);
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
