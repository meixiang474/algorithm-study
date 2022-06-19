// leetcode 508

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

function findFrequentTreeSum(root: TreeNode | null): number[] {
  if (!root) return [];
  const map = new Map<number, number>();
  let max = 0;
  const dfs = (node: TreeNode): number => {
    const sum =
      node.val +
      (node.left ? dfs(node.left) : 0) +
      (node.right ? dfs(node.right) : 0);
    map.set(sum, map.has(sum) ? map.get(sum)! + 1 : 1);
    max = Math.max(max, map.get(sum)!);
    return sum;
  };
  dfs(root);
  const res: number[] = [];
  for (let [key, value] of map) {
    if (value === max) {
      res.push(key);
    }
  }
  return res;
}
