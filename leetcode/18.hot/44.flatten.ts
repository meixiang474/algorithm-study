// leetcode 114

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

export default function flatten(root: TreeNode | null) {
  if (!root) return null;
  const dummyHead = new TreeNode(-1);
  let p = dummyHead;
  const dfs = (node: TreeNode) => {
    const left = node.left
    const right = node.right
    node.left = null
    node.right = null
    p.right = node;
    p = p.right;
    if (left) {
      dfs(left);
    }
    if (right) {
      dfs(right);
    }
  };
  dfs(root);
}
