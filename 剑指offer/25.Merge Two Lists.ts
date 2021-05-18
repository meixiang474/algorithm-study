class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export default function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
) {
  const res = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p = res;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }
  if (p1) p.next = p1;
  if (p2) p.next = p2;
  return res.next;
}
