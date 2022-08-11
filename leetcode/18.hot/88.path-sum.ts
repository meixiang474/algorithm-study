// leetcode 437

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

export default function pathSum(root: TreeNode | null, targetSum: number) {
  const map = new Map<number, number>();
  map.set(0, 1);
  const dfs = (node: TreeNode | null, sum: number) => {
    if (!node) return 0;
    const current = node.val;
    sum += current;
    let count = map.get(sum - targetSum) || 0;
    map.set(sum, map.has(sum) ? map.get(sum)! + 1 : 1);
    count += dfs(node.left, sum);
    count += dfs(node.right, sum);
    map.set(sum, map.get(sum)! - 1);
    return count;
  };
  return dfs(root, 0);
}
