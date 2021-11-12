// leetcode 148

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let slow = head,
    fast = head;
  while (slow && fast && fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const next = slow!.next;
  slow!.next = null;
  const l1 = sortList(head);
  const l2 = sortList(next);
  const dummyHead = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = dummyHead;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return dummyHead.next;
}
