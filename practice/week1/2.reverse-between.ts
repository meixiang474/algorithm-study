// leetcode 92

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prevNode = dummyHead;
  for (let i = 0; i < left - 1; i++) {
    prevNode = prevNode.next!;
  }
  let leftNode = prevNode.next;
  let rightNode = prevNode;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next!;
  }
  let nextNode = rightNode.next;
  prevNode.next = null;
  rightNode.next = null;
  let prev = null;
  let current = leftNode;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  prevNode.next = rightNode;
  leftNode!.next = nextNode;
  return dummyHead.next;
}
