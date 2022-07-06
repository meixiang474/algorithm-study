// leetcode 142

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function detectCycle(head: ListNode | null) {
  if (!head) return null;
  let hasCycle = false;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }
  if (!hasCycle) return null;
  let p: ListNode | null = head;
  while (p && slow) {
    if (p === slow) return p;
    p = p.next;
    slow = slow.next;
  }
}
