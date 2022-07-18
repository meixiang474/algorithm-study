// leetcode 234

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function isPalindrome(head: ListNode | null) {
  if (!head || !head.next) return true;
  let slow: ListNode | null = head,
    fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast) {
    slow = slow!.next;
  }
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let p1: ListNode | null = head;
  let p2 = prev;
  while (p1 && p2) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next
    p2 = p2.next
  }
  return true;
}
