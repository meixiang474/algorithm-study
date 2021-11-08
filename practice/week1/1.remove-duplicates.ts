// leetcode 83

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function removeDuplicates(head: ListNode | null) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function removeDuplicates1(head: ListNode | null) {
  while (head && head.next && head.val === head.next.val) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}

export function removeDuplicates2(head: ListNode | null): ListNode | null {
  if(!head || !head.next) return head
  const res = removeDuplicates2(head.next)
  if(head.val === head.next.val) {
    return res
  }else {
    head.next = res
    return head
  }
}