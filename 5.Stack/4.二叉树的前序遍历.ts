// 144
export {};
interface TreeNode {
  left: TreeNode;
  right: TreeNode;
  value: any;
}

function preOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const stack = [root];
  const res = [];
  while (stack.length) {
    const node = stack.pop();
    res.push(node!.value);
    if (node!.right) stack.push(node!.right);
    if (node!.left) stack.push(node!.left);
  }
  return res;
}
