// leetcode 337

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

export default function rob(root: TreeNode | null) {
  const dfs = (node: TreeNode | null): [number, number] => {
    if (!node) return [0, 0];
    const l = dfs(node.left);
    const r = dfs(node.right);
    return [
      node.val + l[1] + r[1],
      Math.max(l[0], l[1]) + Math.max(r[0], r[1]),
    ];
  };
  const [select, notSelect] = dfs(root);
  return Math.max(select, notSelect);
}
