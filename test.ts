// 25

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function mergeList(h1: ListNode | null, h2: ListNode | null) {
  const h3 = new ListNode(-1);
  let p3 = h3;
  let p1 = h1;
  let p2 = h2;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return h3.next;
}

// 26

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

export function isSubStructure(
  A: TreeNode | null,
  B: TreeNode | null
): boolean {
  if (!A || !B) return false;
  const dfs = (A: TreeNode | null, B: TreeNode | null): boolean => {
    if (!B) return true;
    if (!A || A.val !== B.val) {
      return false;
    }
    return dfs(A.left, B.left) && dfs(A.right, B.right);
  };
  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}

// graph

export function dfs(
  graph: { [key: number]: number[] },
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
  graph: { [key: number]: number[] },
  node: number,
  visited: Set<number>
) {
  const queue = [node];
  visited.add(node);
  while (queue.length > 0) {
    const current = queue.shift()!;
    console.log(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
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
  const flow2: boolean[][] = Array.from({ length: n }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, flow: boolean[][]) => {
    flow[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextC >= 0 &&
        nextR < m &&
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
  let res: number[][] = [];
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

export function cloneGraph(graph: GraphNode | null) {
  if (!graph) return null;
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
  dfs(graph);
  return map.get(graph)!;
}

export function cloneGraph1(graph: GraphNode | null) {
  if (!graph) return null;
  const queue = [graph];
  const map = new Map<GraphNode, GraphNode>();
  map.set(graph, new GraphNode(graph.val));
  while (queue.length > 0) {
    const current = queue.shift()!;
    current.neighbors.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, new GraphNode(item.val));
        queue.push(item);
      }
      map.get(current)!.neighbors.push(map.get(item)!);
    });
  }
  return map.get(graph)!;
}
