/**
 * @description 剑指offer 36
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

export default function treeToDoublyList(root: TreeNode | null) {
  if (!root) return null;
  const res: TreeNode[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    res.push(node);
    if (node.right) {
      dfs(node.right);
    }
  };
  dfs(root);
  let head = null;
  let tail = null;
  for (let i = 0; i < res.length; i++) {
    if (!tail) {
      head = tail = res[i];
      tail.right = head;
      head.left = tail;
    } else {
      let prev = tail;
      tail.right = res[i];
      tail = tail.right;
      tail.left = prev;
      tail.right = head;
      head!.left = tail;
    }
  }
  return head;
}
