// offer 53-I
export function search(nums: number[], target: number) {
  const floor = (nums: number[], target: number) => {
    let l = -1,
      r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor(l + (r - l + 1) / 2);
      if (nums[mid] < target) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const floorIndex = floor(nums, target);
  const ceilIndex = ceil(nums, target);
  return ceilIndex - floorIndex - 1;
}

// leetcode array 40
export function combinationSum2(candidates: number[], target: number) {
  candidates = candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, start: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (start >= candidates.length) {
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      dfs(path.concat(candidates[i]), sum + candidates[i], i + 1);
    }
  };
  dfs([], 0, 0);
  return res;
}

// BST

export interface Visitor {
  visit: (val: number) => void;
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

export class BST {
  root: TreeNode | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(val: number) {
    this.root = this.addNode(this.root, val);
  }
  addNode(node: TreeNode | null, val: number): TreeNode {
    if (!node) {
      this.size++;
      return new TreeNode(val);
    }
    if (node.val < val) {
      node.right = this.addNode(node.right, val);
    } else if (node.val > val) {
      node.left = this.addNode(node.left, val);
    }
    return node;
  }
  contains(val: number) {
    return this.containsNode(this.root, val);
  }
  containsNode(node: TreeNode | null, val: number): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    if (node.val < val) {
      return this.containsNode(node.right, val);
    } else {
      return this.containsNode(node.left, val);
    }
  }
  preOrder(visitor: Visitor) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (!node) return;
    visitor.visit(node.val);
    this.preOrderNode(node.left, visitor);
    this.preOrderNode(node.right, visitor);
  }
  inOrder(visitor: Visitor) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (!node) return;
    this.inOrderNode(node.left, visitor);
    visitor.visit(node.val);
    this.inOrderNode(node.right, visitor);
  }
  postOrder(visitor: Visitor) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (!node) return;
    this.postOrderNode(node.left, visitor);
    this.postOrderNode(node.right, visitor);
    visitor.visit(node.val);
  }
  preOrderNR(visitor: Visitor) {
    if (!this.root) return;
    const stack = [this.root];
    while (stack.length > 0) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor) {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      visitor.visit(current.val);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }
  minimum() {
    if (!this.root) throw new Error("error");
    const res = this.minimumNode(this.root);
    return res.val;
  }
  minimumNode(node: TreeNode): TreeNode {
    if (!node.left) {
      return node;
    }
    return this.minimumNode(node.left);
  }
  maximum() {
    if (!this.root) throw new Error("error");
    const res = this.maximumNode(this.root);
    return res.val;
  }
  maximumNode(node: TreeNode): TreeNode {
    if (!node.right) return node;
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (!this.root) throw new Error("error");
    const { next, res } = this.removeMinNode(this.root);
    this.root = next;
    return res.val;
  }
  removeMinNode(node: TreeNode): { next: TreeNode | null; res: TreeNode } {
    if (!node.left) {
      this.size--;
      return {
        next: node.right,
        res: node,
      };
    }
    const { next, res } = this.removeMinNode(node.left);
    node.left = next;
    return {
      next: node,
      res,
    };
  }
  removeMax() {
    if (!this.root) throw new Error("error");
    const { next, res } = this.removeMaxNode(this.root);
    this.root = next;
    return res.val;
  }
  removeMaxNode(node: TreeNode): { next: TreeNode | null; res: TreeNode } {
    if (!node.right) {
      this.size--;
      return {
        next: node.left,
        res: node,
      };
    }
    const { next, res } = this.removeMaxNode(node.right);
    node.right = next;
    return {
      res,
      next: node,
    };
  }
  remove(val: number) {
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;
    if (node.val > val) {
      return this.removeNode(node.left, val);
    } else if (node.val < val) {
      return this.removeNode(node.right, val);
    } else {
      if (!node.left) {
        this.size--;
        return node.right;
      }
      if (!node.right) {
        this.size--;
        return node.left;
      }
      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right).next;
      return successor;
    }
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

export function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
}

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
  return res;
}

export function inOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export function hasPathSum(root: TreeNode | null, sum: number) {
  if (!root) return false;
  let res = false;
  const dfs = (node: TreeNode, s: number) => {
    if (!node.left && !node.right && s === sum) {
      res = true;
      return;
    }
    if (node.left) {
      dfs(node.left, s + node.left.val);
    }
    if (node.right && res) {
      dfs(node.right, s + node.right.val);
    }
  };
  dfs(root, root.val);
  return res;
}
