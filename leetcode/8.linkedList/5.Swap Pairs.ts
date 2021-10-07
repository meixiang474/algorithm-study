// leetcode 24

export default function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const newHead = head.next;
  const res = swapPairs(newHead.next);
  head.next = res;
  newHead.next = head;
  return newHead;
}
