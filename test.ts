// offer 32-II
export function levelOrder(root: TreeNode) {
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
}

// BST

interface Visitor<T = number> {
  visit: (val: T) => void;
}

export class TreeNode<T = number> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val: T) {
    this.val = val;
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
  add(val: T) {
    this.root = this.addNode(this.root, val);
  }
  addNode(node: TreeNode<T> | null, val: T) {
    if (!node) {
      this.size++;
      return new TreeNode(val);
    }
    if (val === node.val) return node;
    if (val < node.val) {
      node.left = this.addNode(node.left, val);
    } else {
      node.right = this.addNode(node.right, val);
    }
    return node;
  }
  contains(val: T) {
    return this.containsNode(this.root, val);
  }
  containsNode(node: TreeNode<T> | null, val: T): boolean {
    if (!node) return false;
    if (node.val === val) return true;
    if (node.val > val) {
      return this.containsNode(node.left, val);
    } else {
      return this.containsNode(node.right, val);
    }
  }
  preOrder(visitor: Visitor<T>) {
    this.preOrderNode(this.root, visitor);
  }
  preOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    visitor.visit(node.val);
    this.preOrderNode(node.left, visitor);
    this.preOrderNode(node.right, visitor);
  }
  inOrder(visitor: Visitor<T>) {
    this.inOrderNode(this.root, visitor);
  }
  inOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    this.inOrderNode(node.left, visitor);
    visitor.visit(node.val);
    this.inOrderNode(node.right, visitor);
  }
  postOrder(visitor: Visitor<T>) {
    this.postOrderNode(this.root, visitor);
  }
  postOrderNode(node: TreeNode<T> | null, visitor: Visitor<T>) {
    if (!node) return;
    this.postOrderNode(node.left, visitor);
    this.postOrderNode(node.right, visitor);
    visitor.visit(node.val);
  }
  preOrderNR(visitor: Visitor<T>) {
    if (!this.root) return;
    const stack: TreeNode<T>[] = [this.root];
    while (stack.length) {
      const current = stack.pop()!;
      visitor.visit(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }
  levelOrder(visitor: Visitor<T>) {
    if (!this.root) return;
    const queue: TreeNode<T>[] = [this.root];
    while (queue.length) {
      const current = queue.shift()!;
      visitor.visit(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  minimum() {
    if (!this.root) throw new Error("error");
    return this.minimumNode(this.root).val;
  }
  minimumNode(node: TreeNode<T>): TreeNode<T> {
    if (!node.left) {
      return node;
    }
    return this.minimumNode(node.left);
  }
  maximum() {
    if (!this.root) throw new Error("error");
    return this.maximumNode(this.root).val;
  }
  maximumNode(node: TreeNode<T>): TreeNode<T> {
    if (!node.right) return node;
    return this.maximumNode(node.right);
  }
  removeMin() {
    if (!this.root) throw new Error("error");
    const { res, next } = this.removeMinNode(this.root);
    this.root = next;
    return res;
  }
  removeMinNode(node: TreeNode<T>): { res: T; next: TreeNode<T> | null } {
    if (!node.left) {
      this.size--;
      return {
        next: node.right,
        res: node.val,
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
  removeMaxNode(node: TreeNode<T>): { res: T; next: TreeNode<T> | null } {
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
  remove(val: T) {
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node: TreeNode<T> | null, val: T): TreeNode<T> | null {
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

// todo 11.bst
export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
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
  const queue: [TreeNode, number][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function inOrderTraversal(root: TreeNode | null) {
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

export function inOrderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
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

export function hasPathSum(root: TreeNode | null, target: number) {
  if (!root) return false;
  const dfs = (node: TreeNode, sum: number): boolean => {
    if (!node.left && !node.right && sum === target) return true;
    if (!node.left && !node.right) return false;
    let res = false;
    if (node.left) {
      res = dfs(node.left, sum + node.left.val);
    }
    if (res) return res;
    if (node.right) {
      res = dfs(node.right, sum + node.right.val);
    }
    return res;
  };
  return dfs(root, root.val);
}

// leetcode linkedlist 6-10

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function rotateRight(head: ListNode | null, k: number) {
  if (k === 0 || !head || !head.next) return head;
  let count = 1;
  let current = head;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  k = count - (k % count);
  let prev = head;
  for (let i = 0; i < k - 1; i++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}

export function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = deleteDuplicates(head.next);
  if (res && head.val === res.val) {
    return res.next;
  } else if (head.val === head.next.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function deleteDuplicates1(head: ListNode | null) {
  if (!head || !head.next) return head;
  const dummyHead = new ListNode(-1);
  let prev = dummyHead;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function partition(head: ListNode | null, x: number) {
  const minHead = new ListNode(-1);
  const maxHead = new ListNode(-1);
  let prev1 = minHead;
  let prev2 = maxHead;
  let current = head;
  while (current) {
    if (current.val < x) {
      prev1.next = current;
      prev1 = prev1.next;
    } else {
      prev2.next = current;
      prev2 = prev2.next;
    }
    current = current.next;
  }
  prev2.next = null;
  prev1.next = maxHead.next;
  return minHead.next;
}

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
) {
  if (!head || !head.next) return head;
  let prevNode = null;
  let leftNode = null;
  let rightNode = null;
  let nextNode = null;
  let index = 1;
  let current: ListNode | null = head;
  while (current) {
    if (index === left - 1) {
      prevNode = current;
    }
    if (index === left) {
      leftNode = current;
    }
    if (index === right) {
      rightNode = current;
      nextNode = current.next;
    }
    index++;
    current = current.next;
  }
  rightNode!.next = null;
  let prev = null;
  let reverseCurrent = leftNode;
  while (reverseCurrent) {
    const next = reverseCurrent.next;
    reverseCurrent.next = prev;
    prev = reverseCurrent;
    reverseCurrent = next;
  }
  if (prevNode) {
    prevNode.next = rightNode;
  } else {
    head = rightNode;
  }
  leftNode!.next = nextNode;
  return head;
}
