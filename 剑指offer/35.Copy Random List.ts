/**
 * @description 剑指offer 35
 */

class ListNode {
  val: number;
  random: ListNode | null;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.random = null;
    this.next = null;
  }
}

export default function copyRandomList(head: ListNode | null) {
  if (!head) return null;
  const visited = new Map();
  visited.set(undefined, null);
  visited.set(null, null);
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    visited.set(node, newNode);
    if (node.next && !visited.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = visited.get(node.next);
    if (node.random && !visited.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = visited.get(node.random);
  };
  dfs(head);
  return visited.get(head);
}
