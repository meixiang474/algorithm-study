// 18

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function deleteNode(head: ListNode | null, target: number) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === target) {
      prev.next = prev.next.next;
      break;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

// 21
export function exchange(nums: number[]) {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current % 2 === 0) {
      res.push(current);
    } else {
      res.unshift(current);
    }
  }
  return res;
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
    this.root = this.addNode(this.root, e);
  }
  addNode(node: TreeNode | null, e: number) {
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
  contains(e: number) {
    return this.containsNode(this.root, e);
  }
  containsNode(node: TreeNode | null, e: number): boolean {
    if (!node) return false;
    if (node.val === e) {
      return true;
    } else if (node.val > e) {
      return this.containsNode(node.left, e);
    } else {
      return this.containsNode(node.right, e);
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
    return this.minimumNode(this.root).val;
  }
  minimumNode(node: TreeNode): TreeNode {
    if (!node.left) {
      return node;
    }
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
    const { next, res } = this.removeMinNode(this.root);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode): { next: TreeNode | null; res: number } {
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
      next: node,
      res,
    };
  }
  removeMax() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMaxNode(this.root);
    this.root = next;
    return res;
  }
  removeMaxNode(node: TreeNode): { next: TreeNode | null; res: number } {
    if (!node.right) {
      this.size--;
      const res = node.val;
      return {
        res,
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
  remove(e: number) {
    this.root = this.removeNode(this.root, e);
  }
  removeNode(node: TreeNode | null, e: number): TreeNode | null {
    if (!node) {
      return null;
    }
    if (node.val > e) {
      node.left = this.removeNode(node.left, e);
      return node;
    } else if (node.val < e) {
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
      const successor = this.minimumNode(node.right);
      successor.right = this.removeMinNode(node.right).next;
      successor.left = node.left;
      return successor;
    }
  }
}

export function maxDepth(root: TreeNode | null) {
  let res = 0;
  const dfs = (node: TreeNode | null, level: number) => {
    if (!node) return;
    res = Math.max(res, level);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
}

export function minDeptch(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) {
      queue.push([current, level + 1]);
    }
    if (current.right) {
      queue.push([current, level + 1]);
    }
  }
}

export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    if (res[level]) {
      res[level].push(current.val);
    } else {
      res[level] = [current.val];
    }
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
  const res: number[] = [];
  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
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
    if (node.right) {
      dfs(node.right, s + node.right.val);
    }
  };
  dfs(root, root.val);
  return res;
}
