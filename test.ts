// 39
export function combinationSum(candidates: number[], target: number) {
  if (candidates.length === 0) return [];
  const res: number[][] = [];
  const dfs = (sum: number, path: number[], index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (index >= candidates.length) {
      return;
    }
    if (sum > target) {
      return;
    }
    dfs(sum, path, index + 1);
    dfs(sum + candidates[index], [...path, candidates[index]], index);
  };
  dfs(0, [], 0);
  return res;
}

// bst
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
    this.root = this.addNode(val, this.root);
  }
  addNode(val: number, node: TreeNode | null): TreeNode {
    if (!node) {
      this.size++;
      return new TreeNode(val);
    }
    if (node.val > val) {
      node.left = this.addNode(val, node.left);
    } else if (node.val < val) {
      node.right = this.addNode(val, node.right);
    }
    return node;
  }
  contains(val: number) {
    return this.containsNode(val, this.root);
  }
  containsNode(val: number, node: TreeNode | null): boolean {
    if (!node) {
      return false;
    }
    if (node.val === val) {
      return true;
    }
    if (node.val > val) {
      return this.containsNode(val, node.left);
    } else {
      return this.containsNode(val, node.right);
    }
  }
  preOrder(visitor: Visitor) {
    this.preOrderNode(visitor, this.root);
  }
  preOrderNode(visitor: Visitor, node: TreeNode | null) {
    if (node) {
      visitor.visit(node.val);
      this.preOrderNode(visitor, node.left);
      this.preOrderNode(visitor, node.right);
    }
  }
  inOrder(visitor: Visitor) {
    this.inOrderNode(visitor, this.root);
  }
  inOrderNode(visitor: Visitor, node: TreeNode | null) {
    if (node) {
      this.inOrderNode(visitor, node.left);
      visitor.visit(node.val);
      this.inOrderNode(visitor, node.right);
    }
  }
  postOrder(visitor: Visitor) {
    this.postOrderNode(visitor, this.root);
  }
  postOrderNode(visitor: Visitor, node: TreeNode | null) {
    if (node) {
      this.postOrderNode(visitor, node.left);
      this.postOrderNode(visitor, node.right);
      visitor.visit(node.val);
    }
  }
  preOrderNR(visitor: Visitor) {
    if (!this.root) return;
    const stack = [this.root];
    while (stack.length > 0) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
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
    if (!node.right) {
      return node;
    }
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMinNode(this.root);
    this.root = next;
    return res.val;
  }
  removeMinNode(node: TreeNode): { res: TreeNode; next: TreeNode | null } {
    if (!node.left) {
      this.size--;
      return {
        next: node.right,
        res: node,
      };
    }
    const { res, next } = this.removeMinNode(node.left);
    node.left = next;
    return {
      res,
      next: node,
    };
  }
  removeMax() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMaxNode(this.root);
    this.root = next;
    return res.val;
  }
  removeMaxNode(node: TreeNode): { res: TreeNode; next: TreeNode | null } {
    if (!node.right) {
      this.size--;
      return {
        res: node,
        next: node.left,
      };
    }
    const { res, next } = this.removeMaxNode(node.right);
    node.right = next;
    return {
      res,
      next: node,
    };
  }
  remove(val: number) {
    this.root = this.removeNode(val, this.root);
  }
  removeNode(val: number, node: TreeNode | null): TreeNode | null {
    if (!node) {
      return null;
    }
    if (node.val > val) {
      node = this.removeNode(val, node.left);
      return node;
    } else if (node.val < val) {
      node = this.removeNode(val, node.right);
      return node;
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
    if (!node.left && !node.right) {
      res = Math.max(res, level);
    }
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
    if (!current.left && !current.right) return level;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
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
    if (node.left) {
      dfs(node.left);
    }
    res.push(node.val);
    if (node.right) {
      dfs(node.right);
    }
  };
  return res;
}

export function hasPathSum(root: TreeNode | null, sum: number) {
  if (!root) return false;
  const dfs = (node: TreeNode, s: number): boolean => {
    if (s === sum && !node.left && !node.right) {
      return true;
    }
    return !!(
      (node.left && dfs(node.left, s + node.left.val)) ||
      (node.right && dfs(node.right, s + node.right.val))
    );
  };
  return dfs(root, root.val);
}
