// offer 55-I

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

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    res = Math.max(res, level);
    if (node.left) {
      dfs(node.left, level + 1);
    }
    if (node.right) {
      dfs(node.right, level + 1);
    }
  };
  dfs(root, 1);
  return res;
}

// tanxin huisu

export function findContentChildren(g: number[], s: number[]) {
  s.sort((a, b) => a - b);
  g.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item >= g[res]) {
      res++;
    }
  });
  return res;
}

export function maxProfit(profits: number[]) {
  let profit = 0;
  for (let i = 0; i < profits.length - 1; i++) {
    if (profits[i] < profits[i + 1]) {
      profit += profits[i + 1] - profits[i];
    }
  }
  return profit;
}

export function permute(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!nums.includes(nums[i])) {
        dfs(path.concat(nums[i]));
      }
    }
  };
  dfs([]);
  return res;
}

export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], start: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}
