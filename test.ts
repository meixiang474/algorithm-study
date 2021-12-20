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
}
