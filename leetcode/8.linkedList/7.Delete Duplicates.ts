// leetcode 82

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export default function deleteDuplicates(
  head: ListNode | null
): ListNode | null {
  if (!head || !head.next) return head;
  const res = deleteDuplicates(head.next);
  if (res && head.val === res.val) {
    return res.next;
  } else if (head.val === head.next.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}
