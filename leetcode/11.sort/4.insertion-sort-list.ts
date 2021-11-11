// leetcode 147

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function insertionSortList(head: ListNode | null) {
  if (!head || !head.next) return head;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let lastSorted = head;
  let current: ListNode | null = head.next;
  while (current) {
    if (lastSorted.val <= current.val) {
      lastSorted = current;
      current = current.next;
    } else {
      let prev = dummyHead;
      while (prev.next) {
        if (prev.next.val > current.val) break;
        prev = prev.next;
      }
      const insertNext = prev.next;
      const next: ListNode | null = current.next;
      prev.next = current;
      current.next = insertNext;
      current = next;
      lastSorted.next = current;
    }
  }
  return dummyHead.next;
}
