// leetcode 589

class GraphNode {
  val: number;
  children: GraphNode[];
  constructor(val: number) {
    this.val = val;
    this.children = [];
  }
}

export default function preorder(root: GraphNode) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: GraphNode) => {
    res.push(node.val);
    node.children.forEach((item) => dfs(item));
  };
  dfs(root);
  return res;
}
