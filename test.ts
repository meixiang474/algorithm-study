// offer 22

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function getKthFromEnd(head: ListNode | null, k: number) {
  let current = head;
  const res: ListNode[] = [];
  while (current) {
    res.push(current);
    current = current.next;
  }
  return res[res.length - k];
}

// avl-tree
export class AVLTreeNode<K = number, V = any> {
  key: K;
  value: V;
  height: number;
  left: AVLTreeNode<K, V> | null;
  right: AVLTreeNode<K, V> | null;
  constructor(key: K, value: V) {
    this.height = 1;
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class AVLTree<K = number, V = any> {
  root: AVLTreeNode<K, V> | null;
  size: number;
  constructor(compare?: (a: K, b: K) => boolean) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  compare(a: K, b: K) {
    return a < b;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  isBST() {
    const keys: K[] = [];
    this.inorder(this.root, keys);
    for (let i = 1; i < keys.length; i++) {
      if (!this.compare(keys[i - 1], keys[i])) return false;
    }
    return true;
  }
  inorder(node: AVLTreeNode<K, V> | null, keys: K[]) {
    if (node == null) return;
    this.inorder(node.left, keys);
    keys.push(node.key);
    this.inorder(node.right, keys);
  }
  isBalancedNode(node: AVLTreeNode<K, V> | null): boolean {
    if (node == null) return true;
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) return false;
    return this.isBalancedNode(node.left) && this.isBalancedNode(node.right);
  }
  getBalanceFactor(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  getHeight(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return node.height;
  }
}

// tree 1-5

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

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  const res: number[] = [];
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

export function inorderTraversal1(root: TreeNode | null) {
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

export function numsTree(n: number) {
  const dp = [1, 1];
  for (let i = 1; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] = dp[i] + dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function isValidBST(root: TreeNode | null) {
  if (!root) return true;
  const dfs = (node: TreeNode, floor: number, ceil: number): boolean => {
    if (node.val <= floor || node.val >= ceil) return false;
    return (
      (!node.left || dfs(node.left, floor, node.val)) &&
      (!node.right || dfs(node.right, node.val, ceil))
    );
  };
  return dfs(root, -Infinity, Infinity);
}

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  ) {
    return true;
  }
  return false;
}

export function isSymmetric(root: TreeNode | null) {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.left)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
}
