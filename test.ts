// 42
export function maxSubArray(nums: number[]) {
  if (nums.length === 0) {
    return -Infinity;
  }
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max(...dp);
}

// graph

export function bfs(
  graph: { [key: number]: number[] },
  visited: Set<number>,
  node: number
) {
  const queue = [node];
  visited.add(node);
  while (queue.length > 0) {
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

export function dfs(
  graph: { [key: number]: number[] },
  visited: Set<number>,
  node: number
) {
  visited.add(node);
  console.log(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, visited, item);
    }
  });
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
  const res: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
}

export class GraphNode {
  val: number;
  neighbours: GraphNode[];
  constructor(val: number) {
    this.val = val;
    this.neighbours = [];
  }
}

export function cloneGraph(graph: GraphNode | null) {
  if (!graph) return null;
  const viisted = new Map<GraphNode, GraphNode>();
  const dfs = (node: GraphNode) => {
    const newNode = new GraphNode(node.val);
    viisted.set(node, newNode);
    node.neighbours.forEach((item) => {
      if (!viisted.has(item)) {
        dfs(item);
      }
      newNode.neighbours.push(viisted.get(item)!);
    });
  };
  dfs(graph);
  return viisted.get(graph)!;
}

export function cloneGraph1(graph: GraphNode | null) {
  if (!graph) return null;
  const visited = new Map<GraphNode, GraphNode>();
  const queue = [graph];
  visited.set(graph, new GraphNode(graph.val));
  while (queue.length > 0) {
    const current = queue.shift()!;
    current.neighbours.forEach((item) => {
      if (!visited.has(item)) {
        visited.set(item, new GraphNode(item.val));
        queue.push(item);
      }
      visited.get(current)!.neighbours.push(visited.get(item)!);
    });
  }
  return visited.get(graph)!;
}
