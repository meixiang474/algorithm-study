export {};

interface Visitor<T = number> {
  visit: (e: T) => any;
}

class TreeNode<T = number> {
  e: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(e: T) {
    this.e = e;
    this.left = null;
    this.right = null;
  }
}

export class BST<T = number> {
  root: TreeNode<T> | null;
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
  add(e: T) {
    this.root = this.addNode(this.root, e);
  }
  addNode(node: TreeNode<T> | null, e: T): TreeNode<T> {
    if (!node) {
      this.size++;
      return new TreeNode(e);
    }
    if (e === node.e) return node;
    if (e < node.e) {
      node.left = this.addNode(node.left, e);
    } else {
      node.right = this.addNode(node.right, e);
    }
    return node;
  }
  contains(e: T) {
    return this.containsNode(this.root, e);
  }
  containsNode(node: TreeNode<T> | null, e: T): boolean {
    if (!node) {
      return false;
    }
    if (node.e === e) {
      return true;
    }
    if (node.e < e) {
      return this.containsNode(node.right, e);
    } else {
      return this.containsNode(node.left, e);
    }
  }
  preOrder(visitor: Visitor<T>) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) {
      return;
    }
    visitor.visit(node.e);
    this.preOrderNode(node.left, visitor);
    this.preOrderNode(node.right, visitor);
  }
  inOrder(visitor: Visitor<T>) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) {
      return;
    }
    this.inOrderNode(node.left, visitor);
    visitor.visit(node.e);
    this.inOrderNode(node.right, visitor);
  }
  postOrder(visitor: Visitor<T>) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) {
      return;
    }
    this.postOrderNode(node.left, visitor);
    this.postOrderNode(node.right, visitor);
    visitor.visit(node.e);
  }
  preOrderNR(visitor: Visitor<T>) {
    if (!this.root) {
      return;
    }
    const stack = [this.root];
    while (stack.length) {
      const current = stack.pop();
      visitor.visit(current!.e);
      if (current!.right) {
        stack.push(current!.right);
      }
      if (current!.left) {
        stack.push(current!.left);
      }
    }
  }
  levelOrder(visitor: Visitor<T>) {
    if (!this.root) {
      return;
    }
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      visitor.visit(current!.e);
      if (current!.left) {
        queue.push(current!.left);
      }
      if (current!.right) {
        queue.push(current!.right);
      }
    }
  }
  minimum() {
    if (this.size === 0) {
      throw new Error("error");
    }
    let res = this.minimumNode(this.root as TreeNode<T>);
    return res.e;
  }
  minimumNode(node: TreeNode<T>): TreeNode<T> {
    if (!node.left) {
      return node;
    }
    return this.minimumNode(node.left);
  }
  maximum() {
    if (this.size === 0) {
      throw new Error("error");
    }
    let res = this.maximumNode(this.root as TreeNode<T>);
    return res.e;
  }
  maximumNode(node: TreeNode<T>): TreeNode<T> {
    if (!node.right) {
      return node;
    }
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (this.size === 0) {
      throw new Error("error");
    }
    let { res, next } = this.removeMinNode(this.root!);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode<T>): { next: TreeNode<T> | null; res: T } {
    if (!node.left) {
      this.size--;
      let res = node.e;
      return {
        next: node.right,
        res,
      };
    }
    let { res, next } = this.removeMinNode(node.left);
    node.left = next;
    return {
      res,
      next: node,
    };
  }
  removeMax() {
    if (this.size === 0) {
      throw new Error("error");
    }
    let { res, next } = this.removeMaxNode(this.root!);
    this.root = next;
    return res;
  }
  removeMaxNode(node: TreeNode<T>): { res: T; next: TreeNode<T> | null } {
    if (!node.right) {
      let res = node.e;
      this.size--;
      return {
        res,
        next: node.left,
      };
    }
    let { res, next } = this.removeMaxNode(node.right);
    node.right = next;
    return {
      res,
      next: node,
    };
  }
  remove(e: T) {
    this.root = this.removeNode(this.root, e);
  }
  removeNode(node: TreeNode<T> | null, e: T): TreeNode<T> | null {
    if (!node) {
      return null;
    }
    if (node.e > e) {
      node.left = this.removeNode(node.left, e);
      return node;
    } else if (node.e < e) {
      node.right = this.removeNode(node.right, e);
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
      let successor = this.minimumNode(node.right);
      successor.right = this.removeMinNode(node.right).next;
      successor.left = node.left;
      return successor;
    }
  }
}
