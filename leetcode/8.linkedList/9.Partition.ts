// leetcode 86

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function partition(
  head: ListNode | null,
  x: number
): ListNode | null {
  if (!head) return head;
  const minHead = new ListNode(-1);
  const maxHead = new ListNode(-1);
  let prev1 = minHead;
  let prev2 = maxHead;
  let current: ListNode | null = head;
  while (current) {
    if (current.val < x) {
      prev1.next = current;
      prev1 = prev1.next;
    } else {
      prev2.next = current;
      prev2 = prev2.next;
    }
    current = current.next;
  }
  prev2.next = null;
  prev1.next = maxHead.next;
  return minHead.next;
}
