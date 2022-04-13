// offer 29
export function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const res: number[] = [];
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let directionIndex = 0;
  let r = 0;
  let c = 0;
  for (let i = 0; i < m * n; i++) {
    res[i] = matrix[r][c];
    map[r][c] = true;
    const nextR = r + directions[directionIndex][0];
    const nextC = c + directions[directionIndex][1];
    if (
      !(
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !map[nextR][nextC]
      )
    ) {
      directionIndex = (directionIndex + 1) % directions.length;
    }
    r += directions[directionIndex][0];
    c += directions[directionIndex][1];
  }
  return res;
}

// merge sort
export function mergeSort(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
    }
  };
  sortArr(res, 0, res.length - 1, [...res]);
  return res;
}

export function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) res++;
    }
  }
  return res;
}

export function reversePairs1(nums: number[]) {
  let res = 0
  const arr = [...nums]
  
}

// leetcode bfs 6-10
export function rightSideView(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    res[level] = current.val;
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
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

export function canFinish(
  numCourses: number,
  prerequisites: [number, number][]
) {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;
    if (map.has(prerequisites[i][1])) {
      map.get(prerequisites[i][1])?.push(prerequisites[i][0]);
    } else {
      map.set(prerequisites[i][1], [prerequisites[i][0]]);
    }
  }
  const queue: number[] = [];
  let count = 0;
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  while (queue.length) {
    const current = queue.shift()!;
    count++;
    const arr = map.get(current);
    if (arr && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--;
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }
  return count === numCourses;
}

export function findOrder(
  numCourses: number,
  prerequisites: [number, number][]
) {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;
    if (map.has(prerequisites[i][1])) {
      map.get(prerequisites[i][1])?.push(prerequisites[i][0]);
    } else {
      map.set(prerequisites[i][1], [prerequisites[i][0]]);
    }
  }
  const queue: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current);
    const arr = map.get(current);
    if (arr && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--;
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }
  return res.length === numCourses ? res : [];
}

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

export function largestValues(root: TreeNode | null) {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (res[level] == null) {
      res[level] = current.val;
    } else {
      res[level] = Math.max(res[level], current.val);
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}
