// 94
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
function fn(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dps = (node: TreeNode | null) => {
    if (!node) return;
    dps(node.left);
    res.push(node.val);
    dps(node.right);
  };
  dps(root);
  return res;
}

// function fn1(root: TreeNode | null) {
//   if (!root) return [];
//   const res: number[] = [];
//   const stack: TreeNode[] = [];
//   let p: TreeNode | null = root;
//   while (stack.length || p) {
//     while (p) {
//       stack.push(p);
//       p = p.left;
//     }
//     const n = stack.pop()!;
//     res.push(n.val);
//     p = n.right;
//   }
//   return res;
// }
