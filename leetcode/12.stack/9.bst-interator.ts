// leetcode 173

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

class BSTIterator {
  current: TreeNode | null;
  stack: TreeNode[];
  constructor(root: TreeNode | null) {
    this.current = root;
    this.stack = [];
  }
  next() {
    while (this.current) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    const current = this.stack.pop();
    this.current = current ? current.right : null;
    return current ? current.val : null;
  }
  hasNext() {
    return this.current != null || this.stack.length !== 0;
  }
}
