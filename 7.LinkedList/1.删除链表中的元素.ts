// 203
export {};
class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
function removeElements<T>(head: ListNode<T> | null, val: T) {
  while (head && head.val === val) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}
function removeElements1<T>(head: ListNode<T> | null, val: T) {
  const dummyHead = new ListNode<T>(val);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}
function removeElements2<T>(
  head: ListNode<T> | null,
  val: T
): ListNode<T> | null {
  if (!head) return head;
  let res = removeElements2<T>(head.next, val);
  if (head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}
