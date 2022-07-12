// leetcode 206

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val
    this.next = null
  }
}

export default function reverseList(head: ListNode | null): ListNode | null {
  if(!head || !head.next) return head
  const res = reverseList(head.next)!
  head.next.next = head
  head.next = null
  return res
}