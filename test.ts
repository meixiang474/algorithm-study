// offer 53-I
export default function missingNumber(nums: number[]) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// leetcode array 41
function firstMissingPositive(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      nums[i] = nums.length + 1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    const current = Math.abs(nums[i]);
    if (current <= nums.length) {
      nums[current - 1] = -Math.abs(nums[current - 1]);
    }
  }
  console.log(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }
  return nums.length + 1;
}

// set map

export function dfs(
  graph: Record<number, number[]>,
  node: number,
  visited: Set<number>
) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, item, visited);
    }
  });
}

export function bfs(
  graph: Record<number, number[]>,
  node: number,
  visited: Set<number>
) {
  const queue: number[] = [node];
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
        !flow[nextR][nextC]
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
  neighbours: GraphNode[] = [];
  constructor(public val: number) {}
}

export function cloneGraph(graph: GraphNode | null) {
  if(!graph) return null
  const visited = new Map<GraphNode, GraphNode>()
  const dfs = (node: GraphNode) => {
    const newNode = new GraphNode(node.val)
    visited.set(node, newNode)
    node.neighbours.forEach(item => {
      if(!visited.has(item)) {
        dfs(item)
      }
      newNode.neighbours.push(item)
    })
  }
  dfs(graph)
  return visited.get(graph)!
}

export function cloneGraph1(graph: GraphNode | null) {
  if(!graph) return null
  const visited = new Map<GraphNode, GraphNode>()
  visited.set(graph, new GraphNode(graph.val))
  const queue: GraphNode[] = [graph]
  while(queue.length > 0) {
    const current = queue.shift()!
    current.neighbours.forEach(item => {
      if(!visited.has(item)) {
        queue.push(item)
        visited.set(item, new GraphNode(item.val))
      }
      visited.get(current)!.neighbours.push(item)
    })
  }
  return visited.get(graph)!
}
