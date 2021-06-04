/**
 * @description 剑指offer 52
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  if (!headA || !headB) return null;
  const map = new Map<ListNode, boolean>();
  let p1: ListNode | null = headA;
  while (p1) {
    map.set(p1, true);
    p1 = p1.next;
  }
  let p2: ListNode | null = headB;
  while (p2) {
    if (map.get(p2)) return p2;
    p2 = p2.next;
  }
  return null;
}
