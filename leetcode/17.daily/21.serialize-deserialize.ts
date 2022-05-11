// leetcode 449
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

export function serialize(root: TreeNode | null) {
  if (!root) return "";
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    res.push(node.val);
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res.join(",");
}

 export function deserialize(s: string) {
  if (s === "") return null;
  const preOrderArr = s.split(",").map((item) => parseFloat(item));
  const inOrderArr = [...preOrderArr].sort((a, b) => a - b);
  const buildTree = (
    preOrderArr: number[],
    inOrderArr: number[]
  ): TreeNode | null => {
    if (preOrderArr.length === 0 || inOrderArr.length === 0) return null;
    const head = new TreeNode(preOrderArr[0]);
    const headIndex = inOrderArr.indexOf(head.val);
    head.left = buildTree(
      preOrderArr.slice(1, headIndex + 1),
      inOrderArr.slice(0, headIndex)
    );
    head.right = buildTree(
      preOrderArr.slice(headIndex + 1),
      inOrderArr.slice(headIndex + 1)
    );
    return head;
  };
  return buildTree(preOrderArr, inOrderArr);
}
