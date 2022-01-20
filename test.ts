// offer 7
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

export function buildTree(
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;
  const rootValue = preorder[0];
  const rootNode = new TreeNode(rootValue);
  const rootIndex = inorder.indexOf(rootValue);
  rootNode.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  rootNode.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return rootNode;
}

// linked list
export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class LinkedList<T = number> {
  dummyHead: ListNode<T>;
  size: number;
  constructor(dummyHead: T) {
    this.dummyHead = new ListNode(dummyHead)
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    
  }
}