// 7
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
export const buildTree = (
  preorder: number[],
  inorder: number[]
): TreeNode | null => {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootVal = preorder[0];
  const rootNode = new TreeNode(rootVal);
  const rootIndex = inorder.indexOf(rootVal);
  rootNode.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  rootNode.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return rootNode;
};

export class QueueBasedOnStack<T> {
  stack1: T[];
  stack2: T[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(item: T) {
    this.stack1.push(item);
  }
  dequeue() {
    if (this.stack1.length === 0) throw new Error("error");
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop()!);
    }
    const res = this.stack2.pop()!;
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop()!);
    }
    return res;
  }
}
