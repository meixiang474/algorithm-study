// offer 62

export function lastRemaining(n: number, m: number) {
  const f = (n: number, m: number): number => {
    if (n === 1) return 0;
    const x = f(n - 1, m);
    return (m + x) % n;
  };
  return f(n, m);
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
  const queue: [TreeNode, number][] = [];
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

export function inOrderTraversal(root: TreeNode | null) {
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

export function inOrderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  while (stack.length > 0 || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
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
    if (node.right) {
      dfs(node.right, s + node.right.val);
    }
  };
  dfs(root, root.val);
  return res;
}

export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    if (node.right) {
      dfs(node.right);
    }
    res.push(node.val);
  };
  dfs(root);
  return res;
}

export function postOrderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (p || stack.length > 0) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}
