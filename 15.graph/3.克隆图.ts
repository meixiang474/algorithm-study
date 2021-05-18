// 133
export {};
class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val == null ? 0 : val;
    this.neighbors = neighbors == null ? [] : neighbors;
  }
}
// dfs
function cloneGraph(node: GraphNode | null) {
  if (!node) return;
  const visited = new Map<GraphNode, GraphNode>();
  function dfs(node: GraphNode) {
    const newNode = new GraphNode(node.val);
    visited.set(node, newNode);
    node.neighbors.forEach((item) => {
      if (!visited.has(item)) {
        dfs(item);
      }
      newNode.neighbors.push(visited.get(item) as GraphNode);
    });
  }
  dfs(node);
  return visited.get(node);
}

//bfs
function cloneGraph1(node: GraphNode | null) {
  if (!node) return;
  const visited = new Map<GraphNode, GraphNode>();
  visited.set(node, new GraphNode(node.val));
  const queue = [node];
  while (queue.length) {
    const current = queue.shift() as GraphNode;
    current.neighbors.forEach((item) => {
      if (!visited.has(item)) {
        queue.push(item);
        visited.set(item, new GraphNode(item.val));
      }
      (visited.get(current) as GraphNode).neighbors.push(
        visited.get(item) as GraphNode
      );
    });
  }
  return visited.get(node);
}
