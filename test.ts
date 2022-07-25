export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 47 48
export function maxValue(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 && c === 0) {
        dp[r][c] = grid[r][c];
      } else if (r === 0) {
        dp[r][c] = grid[r][c] + dp[r][c - 1];
      } else if (c === 0) {
        dp[r][c] = grid[r][c] + dp[r - 1][c];
      } else {
        dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
      }
    }
  }
  return dp[m - 1][n - 1];
}

export function lengthOfLongestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

// array
export class MyArray<T = number> {
  data: (T | null)[];
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
    this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  resize(newCapacity: number) {
    const newData: (T | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, item: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size >= this.data.length) {
      this.resize(2 * this.data.length);
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.size++;
  }
  addFirst(item: T) {
    this.add(0, item);
  }
  addLast(item: T) {
    this.add(this.size, item);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index];
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(item: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === item) return true;
    }
    return false;
  }
  find(item: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === item) return i;
    }
    return -1;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.data.length / 4) &&
      Math.floor(this.data.length / 2) !== 0
    ) {
      this.resize(Math.floor(this.data.length / 2));
    }
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(item: T) {
    const index = this.find(item);
    if (index === -1) return false;
    this.remove(index);
    return true;
  }
  set(index: number, item: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = item;
  }
  toString() {
    let res = `MyArray: size=${this.size}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

// hot 21-24
export function permute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!path.includes(nums[i])) dfs(path.concat(nums[i]));
    }
  };
  dfs([]);
  return res;
}

export function rotate(matrix: number[][]) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
}

export function groupAnagrams(nums: string[]) {
  const map = new Map<string, string[]>();
  for (let item of nums) {
    const key = item.split("").sort().join("");
    if (map.has(key)) {
      map.get(key)!.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  const res: string[][] = [];
  for (let [key, value] of map) {
    res.push(value);
  }
  return res;
}

export function maxSubarray(nums: number[]) {
  const dp: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = dp[i - 1] >= 0 ? dp[i - 1] + nums[i] : nums[i];
  }
  return Math.max(...dp);
}

// leetcode daily 11-15
export class Solution {
  nums: number[];
  constructor(nums: number[]) {
    this.nums = nums;
  }
  pick(target: number) {
    let count = 0;
    let res = -1;
    for (let i = 0; i < this.nums.length; i++) {
      if (this.nums[i] === target) {
        count++;
        if (Math.floor(Math.random() * count) === 0) res = i;
      }
    }
    return res;
  }
}

export function projectionArea(grid: number[][]) {
  if (grid.length === 0) return 0;
  const n = grid.length;
  const rowMax: number[] = new Array(n).fill(0);
  const colMax: number[] = new Array(n).fill(0);
  let topArea = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const current = grid[r][c];
      if (current !== 0) topArea++;
      rowMax[r] = Math.max(rowMax[r], current);
      colMax[c] = Math.max(colMax[c], current);
    }
  }
  return (
    topArea + rowMax.reduce((a, b) => a + b) + colMax.reduce((a, b) => a + b)
  );
}

export function percificAtlantic(grid: number[][]) {
  if (grid.length === 0 || grid[0].length === 0) return [];
  const m = grid.length;
  const n = grid[0].length;
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
        grid[r][c] <= grid[nextR][nextC] &&
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
      if (flow1[r][c] && flow2[r][c]) res.push([r, c]);
    }
  }
  return res;
}

export function sortArrayByParity(nums: number[]) {
  return nums.sort((a, b) => {
    if (a % 2 === b % 2) return 0;
    if (a % 2 === 0) return -1;
    return 0;
  });
}

export class TreeNode1 {
  val: boolean;
  isLeaf: boolean;
  topLeft: TreeNode1 | null;
  topRight: TreeNode1 | null;
  bottomLeft: TreeNode1 | null;
  bottomRight: TreeNode1 | null;
  constructor(
    val: boolean,
    isLeaf: boolean,
    topLeft: TreeNode1 | null = null,
    topRight: TreeNode1 | null = null,
    bottomLeft: TreeNode1 | null = null,
    bottomRight: TreeNode1 | null = null
  ) {
    this.val = val;
    this.isLeaf = isLeaf;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }
}

export function fourTree(grid: number[][]) {
  const dfs = (
    grid: number[][],
    r0: number,
    c0: number,
    r1: number,
    c1: number
  ): TreeNode1 => {
    let same = true;
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        if (grid[r][c] !== grid[r0][c0]) {
          same = false;
          break;
        }
      }
    }
    if (same) {
      return new TreeNode1(grid[r0][c0] === 1, true);
    }
    return new TreeNode1(
      true,
      false,
      dfs(
        grid,
        r0,
        c0,
        Math.floor(r0 + (r1 - r0) / 2),
        Math.floor(c0 + (c1 - c0) / 2)
      ),
      dfs(
        grid,
        r0,
        Math.floor(c0 + (c1 - c0) / 2) + 1,
        Math.floor(r0 + (r1 - r0) / 2),
        c1
      ),
      dfs(
        grid,
        Math.floor(r0 + (r1 - r0) / 2) + 1,
        c0,
        r1,
        Math.floor(c0 + (c1 - c0) / 2)
      ),
      dfs(
        grid,
        Math.floor(r0 + (r1 - r0) / 2) + 1,
        Math.floor(c0 + (c1 - c0) / 2) + 1,
        r1,
        c1
      )
    );
  };
  return dfs(grid, 0, 0, grid.length - 1, grid.length - 1);
}

// practice week3
