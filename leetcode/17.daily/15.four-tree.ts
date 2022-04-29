// leetcode 427

export class TreeNode {
  val: boolean;
  isLeaf: boolean;
  topLeft: TreeNode | null;
  topRight: TreeNode | null;
  bottomLeft: TreeNode | null;
  bottomRight: TreeNode | null;
  constructor(
    val: boolean,
    isLeaf: boolean,
    topLeft: TreeNode | null = null,
    topRight: TreeNode | null = null,
    bottomLeft: TreeNode | null = null,
    bottomRight: TreeNode | null = null
  ) {
    this.val = val;
    this.isLeaf = isLeaf;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }
}

export default function constructor(grid: number[][]) {
  const dfs = (
    grid: number[][],
    r0: number,
    c0: number,
    r1: number,
    c1: number
  ): TreeNode => {
    let same = true;
    for (let i = r0; i <= r1; i++) {
      for (let j = c0; j <= c1; j++) {
        if (grid[i][j] !== grid[r0][c0]) {
          same = false;
          break;
        }
      }
      if (!same) break;
    }
    if (same) {
      return new TreeNode(grid[r0][c0] === 1, true);
    }
    return new TreeNode(
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
