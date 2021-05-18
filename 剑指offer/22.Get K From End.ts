class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export default function getKthFromEnd(head: ListNode | null, k: number) {
  if (!head) return null;
  const res: number[] = [];
  let current: ListNode | null = head;
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res[res.length - k];
}
