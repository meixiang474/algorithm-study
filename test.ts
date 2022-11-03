import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 62 63
// todo
// graph
export function bfs(
  graph: Record<number, number[]>,
  node: number,
  visited: Set<number>
) {
  const res: number[] = [];
  const queue: number[] = [node];
  visited.add(node);
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
      }
    });
  }
  return res;
}

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

export function waterFlow(matrix: number[][]) {
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
      if (flow1[r][c] && flow2[r][c]) res.push([r, c]);
    }
  }
  return res;
}

export class GraphNode {
  val: number;
  neighbours: GraphNode[];
  constructor(val: number, neighbours: GraphNode[] = []) {
    this.val = val;
    this.neighbours = neighbours;
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
  return visited.get(node)!;
}

export function cloneGraph1(node: GraphNode | null) {
  if (!node) return null;
  const queue: GraphNode[] = [node];
  const visited = new Map<GraphNode, GraphNode>();
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
  return visited.get(node)!;
}

// hot 57 - 60
export function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let [key, value] of map) {
    if (value > Math.floor(nums.length / 2)) return key;
  }
}

export function rob(nums: number[]) {
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[nums.length];
}

export function numIslands(grid: string[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (r: number, c: number) => {
    grid[r][c] = "0";
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
        grid[nextR][nextC] === "1"
      )
        dfs(nextR, nextC);
    });
  };
  let res = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        res++;
        dfs(r, c);
      }
    }
  }
  return res;
}

export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}

// dp 6-10
export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseInt(s[i - 2] + s[i - 1]) > 26 ? 0 : dp[i - 2]);
  }
  return dp[s.length];
}

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function minimumTotal(triangle: number[][]) {
  const dp: number[][] = Array.from({ length: triangle.length }, () =>
    new Array(triangle.length).fill(Infinity)
  );
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }
  return Math.min(...dp[triangle.length - 1]);
}

export function maxProfit(prices: number[]) {
  let max = 0;
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    const profit = current - min;
    max = Math.max(max, profit);
    min = Math.min(current, min);
  }
  return max;
}

export function maxProduct(nums: number[]) {
  const max = [nums[0]];
  const min = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    max[i] = Math.max(nums[i] * max[i - 1], nums[i] * min[i - 1], nums[i]);
    min[i] = Math.min(nums[i] * max[i - 1], nums[i] * min[i - 1], nums[i]);
  }
  return Math.max(...max);
}
