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
): ListNode | null {
  let leftNode = null;
  let rightNode = null;
  let nextNode = null;
  let prevNode;
  let current = head;
  let index = 1;
  while (current) {
    if (index === left - 1) {
      prevNode = current;
    }
    if (index === left) {
      leftNode = current;
    }
    if (index === right) {
      rightNode = current;
      nextNode = rightNode.next;
    }
    index++;
    current = current.next;
  }
  rightNode!.next = null;
  let prev = null;
  let reverseCurrent = leftNode;
  while (reverseCurrent) {
    const next = reverseCurrent.next;
    reverseCurrent.next = prev;
    prev = reverseCurrent;
    reverseCurrent = next;
  }
  if (prevNode) {
    prevNode.next = rightNode;
  } else {
    head = rightNode;
  }
  leftNode!.next = nextNode;
  return head;
}
