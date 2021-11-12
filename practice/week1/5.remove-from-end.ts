// leetcode 19

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val
    this.next = null
  }
}

export default function removeFromEnd(head: ListNode | null, k: number) {
  const dummyHead = new ListNode(-1)
  dummyHead.next = head
  const stack: ListNode[] = []
  let current: ListNode | null = dummyHead
  while(current) {
    stack.push(current)
    current = current.next
  }
  for(let i = 0; i < k; i++) {
    stack.pop()
  }
  const prev = stack[stack.length - 1]
  prev.next = prev.next!.next
  return dummyHead.next
}