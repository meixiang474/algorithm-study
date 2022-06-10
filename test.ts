// offer 34
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

export function pathSum(root: TreeNode | null, target: number) {
  if (!root) return [];
  const res: number[][] = [];
  const dfs = (node: TreeNode, path: number[], sum: number) => {
    if (sum === target && !node.left && !node.right) {
      res.push(path);
      return;
    }
    if (node.left)
      dfs(node.left, path.concat(node.left.val), sum + node.left.val);
    if (node.right)
      dfs(node.right, path.concat(node.right.val), sum + node.right.val);
  };
  dfs(root, [root.val], root.val);
  return res;
}

// graph
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

export function bfs(graph: Record<number, number[]>, node: number) {
  const visited: Set<number> = new Set();
  const queue: number[] = [node];
  visited.add(node);
  while (queue.length) {
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
  const res: [number, number][] = [];
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
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (flow1[r][c] && flow2[r][c]) res.push([r, c]);
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

export function cloneGraph(node: GraphNode | null) {
  if (!node) return null;
  const visited = new Map<GraphNode, GraphNode>();
  const dfs = (node: GraphNode) => {
    const newNode = new GraphNode(node.val);
    visited.set(node, newNode);
    node.neighbours.forEach((item) => {
      if (!visited.has(item)) {
        dfs(item);
      }
      newNode.neighbours.push(visited.get(item)!);
    });
  };
  dfs(node);
  return visited.get(node);
}

export function cloneGraph1(node: GraphNode | null) {
  if (!node) return null;
  const visited = new Map<GraphNode, GraphNode>();
  const queue: GraphNode[] = [node];
  visited.set(node, new GraphNode(node.val));
  while (queue.length) {
    const current = queue.shift()!;
    current.neighbours.forEach((item) => {
      if (!visited.has(item)) {
        visited.set(item, new GraphNode(item.val));
        queue.push(item);
      }
      visited.get(current)!.neighbours.push(visited.get(item)!);
    });
  }
  return visited.get(node);
}

// hot 1 2



// leetcode sort 6-10

export function largestNumber(nums: number[]) {
  const res = nums
    .map((item) => item.toString())
    .sort((a, b) => parseInt(b + a) - parseInt(a + b))
    .join("");
  return res[0] === "0" ? "0" : res;
}

export function containsDuplicate(nums: number[], k: number, t: number) {
  const getId = (num: number) => {
    return num < 0
      ? Math.floor((num + 1) / (t + 1)) - 1
      : Math.floor(num / (t + 1));
  };
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const id = getId(current);
    if (map.has(id)) return true;
    if (map.has(id + 1) && Math.abs(nums[i] - map.get(id + 1)!) <= t)
      return true;
    if (map.has(id - 1) && Math.abs(nums[i] - map.get(id - 1)!) <= t)
      return true;
    map.set(id, nums[i]);
    if (i >= k) {
      map.delete(getId(nums[i - k]));
    }
  }
  return false;
}

export function isAnagram(s: string, t: string) {
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of t) {
    if (!map.has(item)) return false;
    map.set(item, map.get(item)! - 1);
  }
  for (let [key, value] of map) {
    if (value !== 0) return false;
  }
  return true;
}

export function hIndex(nums: number[]) {
  nums.sort((a, b) => a - b);
  let h = 0;
  let i = nums.length - 1;
  while (i >= 0 && nums[i] > h) {
    h++;
    i--;
  }
  return h;
}

export function wiggleSort(nums: number[]) {
  let l = Math.floor((nums.length - 1) / 2);
  let r = nums.length - 1;
  nums
    .slice()
    .sort((a, b) => a - b)
    .forEach((item, index, arr) => {
      nums[index] = index % 2 === 0 ? arr[l--] : arr[r--];
    });
}
