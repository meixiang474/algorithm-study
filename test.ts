// offer 61

export function isStraight(nums: number[]) {
  const set = new Set<number>();
  let min = 14;
  let max = 0;
  for (let item of nums) {
    if (item === 0) continue;
    if (set.has(item)) return false;
    max = Math.max(item, max);
    min = Math.min(item, min);
    set.add(item);
  }
  return max - min < 5;
}

// BST

interface Visitor {
  visit: (val: number) => void;
}

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
    this.root = this.addNode(e, this.root);
  }
  addNode(e: number, node: TreeNode | null): TreeNode {
    if (!node) {
      this.size++;
      return new TreeNode(e);
    }
    if (node.val < e) {
      node.right = this.addNode(e, node.right);
    }
    if (node.val > e) {
      node.right = this.addNode(e, node.left);
    }
    return node;
  }
  contains(e: number) {
    return this.containsNode(this.root, e);
  }
  containsNode(node: TreeNode | null, e: number): boolean {
    if (!node) return false;
    if (e > node.val) {
      return this.containsNode(node.right, e);
    }
    if (e < node.val) {
      return this.containsNode(node.left, e);
    }
    return true;
  }
  preOrder(visitor: Visitor) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      visitor.visit(node.val);
      this.preOrderNode(node.left, visitor);
      this.preOrderNode(node.right, visitor);
    }
  }
  inOrder(visitor: Visitor) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      this.inOrderNode(node.left, visitor);
      visitor.visit(node.val);
      this.inOrderNode(node.right, visitor);
    }
  }
  postOrder(visitor: Visitor) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode | null, visitor: Visitor) {
    if (node) {
      this.postOrderNode(node.left, visitor);
      this.postOrderNode(node.right, visitor);
      visitor.visit(node.val);
    }
  }
  preOrderNR(visitor: Visitor) {
    if (!this.root) return;
    const stack: TreeNode[] = [this.root];
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
    const queue: TreeNode[] = [this.root];
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
    if (!this.root) {
      throw new Error("error");
    }
    return this.minimumNode(this.root).val;
  }
  minimumNode(node: TreeNode): TreeNode {
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  maximum() {
    if (!this.root) throw new Error("error");
    return this.maximumNode(this.root).val;
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
        res: node,
        next: node.right,
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
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;
    if (node.val < val) {
      node.right = this.removeNode(node.right, val);
      return node;
    } else if (node.val > val) {
      node.left = this.removeNode(node.left, val);
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
    res = Math.max(level, res);
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
