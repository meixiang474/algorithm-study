// 28
export function spiralOrder(matrix: number[][]) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }
  const m = matrix.length;
  const n = matrix[0].length;
  const total = m * n;
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
  let row = 0;
  let col = 0;
  const res: number[] = [];
  for (let i = 0; i < total; i++) {
    map[row][col] = true;
    const current = matrix[row][col];
    res.push(current);
    const nextRow = row + directions[directionIndex][0];
    const nextCol = col + directions[directionIndex][1];
    if (
      !(
        nextRow >= 0 &&
        nextRow < m &&
        nextCol >= 0 &&
        nextCol < n &&
        !map[nextRow][nextCol]
      )
    ) {
      directionIndex = (directionIndex + 1) % directions.length;
    }
    row += directions[directionIndex][0];
    col += directions[directionIndex][1];
  }
  return res;
}

// tanxin huisu
export function findContentChildren(g: number[], s: number[]) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) {
      res++;
    }
  });
  return res;
}

export function maxProfit(nums: number[]) {
  let profit = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      profit += nums[i] - nums[i - 1];
    }
  }
  return profit;
}

export function pernute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach((item) => {
      if (!path.includes(item)) {
        dfs(path.concat(item));
      }
    });
  };
  dfs([]);
  return res;
}

export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], length: number, start: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      dfs(path.concat(nums[i]), length, start + 1);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], i, 0);
  }
  return res;
}
