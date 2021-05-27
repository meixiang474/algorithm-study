export interface Visitor {
  visit: (val: number) => any;
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
  add(e: number) {
    this.root = this.addNode(this.root, e);
  }
  addNode(node: TreeNode | null, e: number): TreeNode {
    if (!node) {
      this.size++;
      return new TreeNode(e);
    }
    if (node.val > e) {
      node.left = this.addNode(node.left, e);
    } else if (node.val < e) {
      node.right = this.addNode(node.right, e);
    }
    return node;
  }
  contains(val: number): boolean {
    return this.containsNode(this.root, val);
  }
  containsNode(node: TreeNode | null, val: number): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    if (node.val > val) {
      return this.containsNode(node.left, val);
    } else {
      return this.containsNode(node.right, val);
    }
  }
  preOrder(visitor: Visitor): void {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode | null, visitor: Visitor): void {
    if (!node) return;
    visitor.visit(node.val);
    this.preOrderNode(node.left, visitor);
    this.preOrderNode(node.right, visitor);
  }
  inOrder(visitor: Visitor): void {
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
    while (stack.length) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor) {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift()!;
      visitor.visit(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
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
    const { res, next } = this.removeMinNode(this.root);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode): { res: number; next: TreeNode | null } {
    if (!node.left) {
      this.size--;
      const res = node.val;
      return {
        next: node.right,
        res,
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
    return res;
  }
  removeMaxNode(node: TreeNode): { res: number; next: TreeNode | null } {
    if (!node.right) {
      const res = node.val;
      this.size--;
      return {
        next: node.left,
        res,
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
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;
    if (node.val > val) {
      node.left = this.removeNode(node.left, val);
      return node;
    } else if (node.val < val) {
      node.right = this.removeNode(node.right, val);
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
    res = Math.max(res, level);
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}

export function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
}

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    let arr = res[level];
    if (!arr) arr = res[level] = [];
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
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

export function hasPathSum(root: TreeNode | null, targetSum: number) {
  if (!root) return false;
  let res = false;
  const dfs = (node: TreeNode, sum: number) => {
    if (!node.left && !node.right && sum === targetSum) {
      res = true;
      return;
    }
    if (node.left) dfs(node.left, sum + node.left.val);
    if (node.right) dfs(node.right, sum + node.right.val);
  };
  dfs(root, root.val);
  return res;
}
