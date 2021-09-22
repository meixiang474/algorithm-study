// leetcode 138

class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export default function copyRandomList(head: ListNode | null): ListNode | null {
  if (!head) return head;
  const map = new Map<ListNode | null, ListNode | null>();
  map.set(null, null);
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    map.set(node, newNode);
    if (!map.has(node.random)) {
      dfs(node.random!);
    }
    newNode.random = map.get(node.random) as ListNode | null;
    if (!map.has(node.next)) {
      dfs(node.next!);
    }
    newNode.next = map.get(node.next) as ListNode | null;
  };
  dfs(head);
  return map.get(head) as ListNode;
}
