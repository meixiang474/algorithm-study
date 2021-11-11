// leetcode 24

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function swapPairs(head: ListNode | null) {
  if (!head || !head.next) return head;
  const newHead = head.next;
  const res = swapPairs(newHead.next);
  head.next = res;
  newHead.next = head;
  return newHead;
}
