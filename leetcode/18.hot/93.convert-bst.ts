// leetcode 538

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val
    this.left = null;
    this.right = null
  }
}

export default function convertBST(root: TreeNode | null) {
  if(!root) return root
  let sum = 0
  const dfs = (node: TreeNode) => {
    if(node.right) dfs(node.right)
    sum += node.val
    node.val = sum
    if(node.left) dfs(node.left)
  }
  dfs(root)
  return root
}