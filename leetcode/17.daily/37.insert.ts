// 剑指offer II 029

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function insert(head: ListNode | null, insertVal: number) {
  const node = new ListNode(insertVal);
  if (!head) {
    node.next = node;
    return node;
  }
  let current: ListNode | null = head,
    next = head.next;
  while (current && next && next !== head) {
    if (insertVal >= current.val && insertVal <= next.val) {
      break;
    }
    if (current.val > next.val) {
      if (insertVal > current.val || insertVal < next.val) break;
    }
    current = current.next;
    next = next.next;
  }
  current!.next = node;
  node.next = next;
  return head;
}
