class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export default function reversePrint(head: ListNode | null) {
  const reverse = (head: ListNode | null): ListNode | null => {
    if (!head || !head.next) return head;
    const res = reverse(head.next);
    head.next.next = head;
    head.next = null;
    return res;
  };
  // 先将链表反转
  const newHead = reverse(head);
  let current = newHead;
  const res = [];
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res;
}
