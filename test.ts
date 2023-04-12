import { Heap } from "./practice/week5/1.heap";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 26 27
export const isSubstructure = (
  A: TreeNode | null,
  B: TreeNode | null
): boolean => {
  if (!A || !B) return false;
  const dfs = (A: TreeNode | null, B: TreeNode | null): boolean => {
    if (!B) return true;
    if (!A || A.val !== B.val) return false;
    return dfs(A.left, B.left) && dfs(A.right, B.right);
  };
  return dfs(A, B) || isSubstructure(A.left, B) || isSubstructure(A.right, B);
};

export const mirrorTree = (root: TreeNode | null) => {
  if (!root) return null;
  const res = new TreeNode(root.val);
  const dfs = (node: TreeNode, res: TreeNode) => {
    if (node.left) {
      res.right = new TreeNode(node.left.val);
      dfs(node.left, res.right);
    }
    if (node.right) {
      res.left = new TreeNode(node.right.val);
      dfs(node.right, res.left);
    }
  };
  dfs(root, res);
  return res;
};

// bst
interface Visitor<T = number> {
  visit: (val: T) => void;
}

export class TreeNode1<T = number> {
  val: T;
  left: TreeNode1<T> | null;
  right: TreeNode1<T> | null;
  constructor(val: T) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class BST<T = number> {
  root: TreeNode1<T> | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  add(val: T) {
    this.root = this.addNode(this.root, val);
  }
  addNode(node: TreeNode1<T> | null, val: T): TreeNode1<T> {
    if (!node) {
      this.size++;
      return new TreeNode1(val);
    }
    if (node.val < val) {
      node.right = this.addNode(node.right, val);
    } else if (node.val > val) {
      node.left = this.addNode(node.left, val);
    }
    return node;
  }
  contains(val: T) {
    return this.containsNode(this.root, val);
  }
  containsNode(node: TreeNode1<T> | null, val: T): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    if (node.val > val) return this.containsNode(node.left, val);
    return this.containsNode(node.right, val);
  }
  preOrder(visitor: Visitor<T>) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode1<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    visitor.visit(node.val);
    this.preOrderNode(node.left, visitor);
    this.preOrderNode(node.right, visitor);
  }
  inOrder(visitor: Visitor<T>) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode1<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    this.inOrderNode(node.left, visitor);
    visitor.visit(node.val);
    this.inOrderNode(node.right, visitor);
  }
  postOrder(visitor: Visitor<T>) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode1<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    this.postOrderNode(node.left, visitor);
    this.postOrderNode(node.right, visitor);
    visitor.visit(node.val);
  }
  preOrderNR(visitor: Visitor<T>) {
    if (!this.root) return;
    const stack: TreeNode1<T>[] = [this.root];
    while (stack.length) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor<T>) {
    if (!this.root) return;
    const queue: TreeNode1<T>[] = [this.root];
    while (queue.length) {
      const current = queue.shift()!;
      visitor.visit(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  minimum() {
    if (!this.root) throw new Error("error");
    const node = this.minimumNode(this.root);
    return node.val;
  }
  minimumNode(node: TreeNode1<T>): TreeNode1<T> {
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  maximum() {
    if (!this.root) return;
    const node = this.maximumNode(this.root);
    return node.val;
  }
  maximumNode(node: TreeNode1<T>): TreeNode1<T> {
    if (!node.right) return node;
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMinNode(this.root);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode1<T>): { res: T; next: TreeNode1<T> | null } {
    if (!node.left) {
      this.size--;
      const res = node.val;
      const next = node.right;
      return {
        res,
        next,
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
  removeMaxNode(node: TreeNode1<T>): { res: T; next: TreeNode1<T> | null } {
    if (!node.right) {
      this.size--;
      const res = node.val;
      const next = node.left;
      return {
        res,
        next,
      };
    }
    const { res, next } = this.removeMaxNode(node.right);
    node.right = next;
    return {
      res,
      next: node,
    };
  }
  remove(val: T) {
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node: TreeNode1<T> | null, val: T): TreeNode1<T> | null {
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
      successor.right = this.removeMinNode(node.right).next;
      successor.left = node.left;
      return successor;
    }
  }
}

export const maxDepth1 = (root: TreeNode | null) => {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
};

export const minDepth = (root: TreeNode | null) => {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) return level;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
};

export const levelOrder = (root: TreeNode | null) => {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
};

export const inOrderTraversal = (root: TreeNode | null) => {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
};

export const inOrderTraversal1 = (root: TreeNode | null) => {
  if (!root) return [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  const res: number[] = [];
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
};

export const hasPathSum = (root: TreeNode | null, sum: number) => {
  if (!root) return false;
  let res = false;
  const dfs = (node: TreeNode, currentSum: number) => {
    if (!node.left && !node.right && currentSum === sum) {
      res = true;
      return;
    }
    if (node.left) dfs(node.left, currentSum + node.left.val);
    if (node.right && !res) dfs(node.right, currentSum + node.right.val);
  };
  dfs(root, root.val);
  return res;
};

export const postOrderTraversal = (root: TreeNode | null) => {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (current.right && current.right !== prevRight) {
      stack.push(current);
      p = current.right;
    } else {
      res.push(current.val);
      prevRight = current;
    }
  }
  return res;
};

// hot 13 - 16
// todo
// dfs 1-5
export const isValidBST = (root: TreeNode | null) => {
  const dfs = (node: TreeNode | null, floor: number, ceil: number): boolean => {
    if (!node) return false;
    if (node.val <= floor || node.val >= ceil) return false;
    return dfs(node.left, floor, node.val) && dfs(node.right, node.val, ceil);
  };
  return dfs(root, -Infinity, Infinity);
};

export const recoverTree = (root: TreeNode | null) => {
  if (!root) return null;
  const inorder = (node: TreeNode, nums: number[]) => {
    if (node.left) inorder(node.left, nums);
    nums.push(node.val);
    if (node.right) inorder(node.right, nums);
  };
  const findTwo = (nums: number[]) => {
    let x = null,
      y = null;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i + 1] < nums[i]) {
        y = i + 1;
        if (x == null) x = i;
      }
    }
    return [x, y] as [number, number];
  };
  const recover = (node: TreeNode, count: number, x: number, y: number) => {
    if (count === 0) return;
    if (node.val === x || node.val === y) {
      node.val = node.val === x ? y : x;
      count--;
    }
    if (node.left) recover(node.left, count, x, y);
    if (node.right) recover(node.right, count, x, y);
  };
  const nums: number[] = [];
  inorder(root, nums);
  const [x, y] = findTwo(nums);
  recover(root, 2, x, y);
};

export const isSameTree = (p: TreeNode | null, q: TreeNode | null) => {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  )
    return true;
  return false;
};

export const isSymmetric = (root: TreeNode | null) => {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.right)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
};

export const maxDepth = (root: TreeNode | null) => {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
};
