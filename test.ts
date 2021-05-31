export function dfs(
  graph: { [key: number]: number[] },
  visited: Set<number>,
  node: number
) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, visited, item);
    }
  });
}

export function bfs(
  graph: { [key: number]: number[] },
  visited: Set<number>,
  node: number
) {
  const queue: number[] = [node];
  visited.add(node);
  while (queue.length) {
    const current = queue.shift()!;
    console.log(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        queue.push(item);
        visited.add(item);
      }
    });
  }
}

export function fn(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const flow1: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const flow2: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, flow: boolean[][]) => {
    flow[r][c] = true;
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !flow[nextR][nextC] &&
        matrix[nextR][nextC] >= matrix[r][c]
      ) {
        dfs(nextR, nextC, flow);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    dfs(r, 0, flow1);
    dfs(r, n - 1, flow2);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }
  const res: [number, number][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
}

class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val: number) {
    this.val = val;
    this.neighbors = [];
  }
}

export function cloneGraph(node: GraphNode | null) {
  if (!node) return null;
  const map = new Map<GraphNode, GraphNode>();
  const dfs = (node: GraphNode) => {
    const newNode = new GraphNode(node.val);
    map.set(node, newNode);
    node.neighbors.forEach((item) => {
      if (!map.has(item)) {
        dfs(item);
      }
      newNode.neighbors.push(map.get(item)!);
    });
  };
  dfs(node);
  return map.get(node);
}

export function cloneGraph1(node: GraphNode | null) {
  if (!node) return null;
  const map = new Map<GraphNode, GraphNode>();
  map.set(node, new GraphNode(node.val));
  const queue = [node];
  while (queue.length) {
    const current = queue.shift()!;
    current.neighbors.forEach((item) => {
      if (!map.has(item)) {
        queue.push(item);
        map.set(item, new GraphNode(item.val));
      }
      map.get(current)?.neighbors.push(map.get(item)!);
    });
  }
  return map.get(node);
}
