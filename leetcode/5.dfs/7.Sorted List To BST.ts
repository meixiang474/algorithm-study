// leetcode 109

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
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

export default function sortedListToBST(
  head: ListNode | null
): TreeNode | null {
  const buildTree = (
    head: ListNode | null,
    tail: ListNode | null
  ): TreeNode | null => {
    if (head === tail) return null;
    const midNode = getMid(head, tail);
    const node = new TreeNode(midNode!.val);
    node.left = buildTree(head, midNode);
    node.right = buildTree(midNode!.next, tail);
    return node;
  };
  const getMid = (head: ListNode | null, tail: ListNode | null) => {
    let fast = head,
      slow = head;
    while (fast !== tail && slow !== tail && fast!.next !== tail) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    return slow;
  };
  return buildTree(head, null);
}
