// leetcode 1022

export default function sumRootToLeaf(root: TreeNode | null): number {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, path: string) => {
    if (!node.left && !node.right) {
      res += parseInt(path, 2);
    }
    if (node.left) {
      dfs(node.left, path + node.left.val);
    }
    if (node.right) {
      dfs(node.right, path + node.right.val);
    }
  };
  dfs(root, root.val + "");
  return res;
}
