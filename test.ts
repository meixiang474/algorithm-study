// offer 25
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return l3.next;
}

// search sort
export function isObject<T extends any>(obj: T) {
  return typeof obj === "object" && obj;
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key in a) {
    if (a.hasOwnProperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch<T extends any>(arr: T[], target: T) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], target)) return i;
  }
  return -1;
}

export function selectionSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(arr: number[]) {
  const res = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let swapIndex = i;
    let current = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > current) {
        arr[j + 1] = arr[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      arr[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j + 1, j);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}

// union find 1-4

export function solve(board: string[][]) {
  if (board.length === 0 || board[0].length === 0) return;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number) => {
    board[r][c] = "A";
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === "O"
      ) {
        dfs(nextR, nextC);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    if (board[r][0] === "O") {
      dfs(r, 0);
    }
    if (board[r][n - 1] === "O") {
      dfs(r, n - 1);
    }
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === "O") {
      dfs(0, c);
    }
    if (board[m - 1][c] === "O") {
      dfs(m - 1, c);
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "A") {
        board[r][c] = "O";
      } else {
        board[r][c] = "X";
      }
    }
  }
}

export function numIslands(grid: string[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (r: number, c: number) => {
    grid[r][c] = "0";
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        grid[nextR][nextC] === "1"
      ) {
        dfs(nextR, nextC);
      }
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

export function calcEqualtion(
  euqations: string[][],
  values: number[],
  queries: string[][]
) {
  let nodeCount = 0;
  const map = new Map<string, number>();
  for (let i = 0; i < euqations.length; i++) {
    if (!map.has(euqations[i][0])) {
      map.set(euqations[i][0], nodeCount++);
    }
    if (!map.has(euqations[i][1])) {
      map.set(euqations[i][1], nodeCount++);
    }
  }
  const graph: [number, number][][] = new Array(nodeCount).fill(null);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < euqations.length; i++) {
    const node1 = map.get(euqations[i][0])!;
    const node2 = map.get(euqations[i][1])!;
    graph[node1].push([node2, values[i]]);
    graph[node2].push([node1, 1 / values[i]]);
  }
  const res: number[] = [];
  for (let i = 0; i < queries.length; i++) {
    const node1 = map.get(queries[i][0]);
    const node2 = map.get(queries[i][1]);
    if (node1 == null || node2 == null) {
      res[i] = -1;
      continue;
    }
    if (node1 === node2) {
      res[i] = 1;
      continue;
    }
    const ratios: number[] = new Array(nodeCount).fill(-1);
    ratios[node1] = 1;
    const queue = [node1];
    while (queue.length > 0 && ratios[node2] === -1) {
      const current = queue.shift()!;
      for (let i = 0; i < graph[current].length; i++) {
        const [node, value] = graph[current][i];
        if (ratios[node] === -1) {
          ratios[node] = value * ratios[current];
          queue.push(node);
        }
      }
    }
    res[i] = ratios[node2];
  }
  return res;
}

export function findCircleNum(isConnected: number[][]) {
  if (isConnected.length === 0) return 0;
  const m = isConnected.length;
  const visited = new Set<number>();
  const dfs = (r: number) => {
    for (let c = 0; c < m; c++) {
      if (isConnected[r][c] === 1 && !visited.has(c)) {
        visited.add(c);
        dfs(c);
      }
    }
  };
  let res = 0;
  for (let r = 0; r < m; r++) {
    if (!visited.has(r)) {
      visited.add(r);
      res++;
      dfs(r);
    }
  }
  return res;
}
