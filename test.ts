// offer 11
export function minArray(nums: number[]) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] < nums[r]) {
      r = mid;
    } else if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r--;
    }
  }
  return nums[l];
}

// bst

interface Visitor {
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
  addNode(val: number, node: TreeNode | null) {
    if (!node) {
      this.size++;
      return new TreeNode(val);
    }
    if (node.val === val) return node;
    if (node.val > val) {
      node.left = this.addNode(val, node.left);
    } else {
      node.right = this.addNode(val, node.right);
    }
    return node;
  }
  contains(val: number) {
    return this.containsNode(val, this.root);
  }
  containsNode(val: number, node: TreeNode | null): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    if (node.val < val) {
      return this.containsNode(val, node.right);
    } else {
      return this.containsNode(val, node.left);
    }
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
    while (stack.length) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor) {
    if (!this.root) return;
    const queue: TreeNode[] = [this.root];
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
    if (!node.left) return node;
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
      return {
        res: node.val,
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
    return res;
  }
  removeMaxNode(node: TreeNode): { res: number; next: TreeNode | null } {
    if (!node.right) {
      this.size--;
      return {
        res: node.val,
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
    if (!node) return null;
    if (node.val > val) {
      node.left = this.removeNode(val, node.left);
      return node;
    } else if (node.val < val) {
      node.right = this.removeNode(val, node.right);
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
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}

export function minDepth1(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) return level;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
}

export function levelOrder1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
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

export function inOrder1(root: TreeNode | null) {
  if (!root) return [];
  const stack: TreeNode[] = [];
  const res: number[] = [];
  let p: TreeNode | null = root;
  while (stack.length || p) {
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
  const dfs = (node: TreeNode, count: number): boolean => {
    if (!node.left && !node.right && count === sum) {
      return true;
    }
    return (
      (!!node.left && dfs(node.left, count + node.left.val)) ||
      (!!node.right && dfs(node.right, count + node.right.val))
    );
  };
  return dfs(root, root.val);
}

export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      prevRight = current;
      res.push(current.val);
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

// dfs 1 - 5
export function isValidBST(root: TreeNode | null) {
  const dfs = (node: TreeNode | null, floor: number, ceil: number): boolean => {
    if (!node) return true;
    if (node.val <= floor || node.val >= ceil) return false;
    return dfs(node.left, floor, node.val) && dfs(node.right, node.val, ceil);
  };
  return dfs(root, -Infinity, Infinity);
}

export function recoverTree(root: TreeNode | null) {
  const inorder = (node: TreeNode | null, nums: number[]) => {
    if (!node) return;
    inorder(node.left, nums);
    nums.push(node.val);
    inorder(node.right, nums);
  };
  const findTwo = (nums: number[]) => {
    let x = null,
      y = null;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i + 1] < nums[i]) {
        y = nums[i + 1];
        if (x == null) {
          x = nums[i];
        } else {
          break;
        }
      }
    }
    return [x, y] as [number, number];
  };
  const recover = (
    node: TreeNode | null,
    count: number,
    x: number,
    y: number
  ) => {
    if (node) {
      if (node.val === x || node.val === y) {
        node.val = node.val === x ? y : x;
        count--;
        if (count === 0) return;
      }
      recover(node.left, count, x, y);
      recover(node.right, count, x, y);
    }
  };
  const nums: number[] = [];
  inorder(root, nums);
  const [x, y] = findTwo(nums);
  recover(root, 2, x, y);
}

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
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
}
