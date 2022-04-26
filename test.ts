// offer 32-I
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const queue: TreeNode[] = [root];
  const res: number[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    res.push(current.val);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
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
  preOrder(visitor: Visitor<T>) {}
}

// leetcode hashtable 6-10

export function inorderTraversal(root: TreeNode | null) {
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

export class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: ListNode | null) {
  if (!head) return head;
  const map = new Map<ListNode | null, ListNode | null>();
  map.set(null, null);
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    map.set(node, newNode);
    if (!map.has(node.random)) {
      dfs(node.random!);
    }
    newNode.random = map.get(node.random)!;
    if (!map.has(node.next)) {
      dfs(node.next!);
    }
    newNode.next = map.get(node.next)!;
  };
  dfs(head);
  return map.get(head);
}

export function isHappy(n: number) {
  const compute = (n: number) => {
    return n
      .toString()
      .split("")
      .map((item) => parseInt(item))
      .reduce((memo, current) => {
        return memo + current ** 2;
      }, 0);
  };
  const set = new Set<number>();
  while (!set.has(n)) {
    if (n === 1) return true;
    set.add(n);
    n = compute(n);
  }
  return false;
}

export function isIsomorphic(s: string, t: string) {
  if (s.length !== t.length) return false;
  const smap = new Map<string, string>();
  const tmap = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    const scurrent = s[i];
    const tcurrent = t[i];
    if (
      (smap.has(scurrent) && smap.get(scurrent) !== tcurrent) ||
      (tmap.has(tcurrent) && tmap.get(tcurrent) !== scurrent)
    ) {
      return false;
    }
    smap.set(scurrent, tcurrent);
    tmap.set(tcurrent, scurrent);
  }
  return true;
}

export function containerDuplicate(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    if (set.has(item)) return true;
    set.add(item);
  }
  return false;
}
