// 83
export {};
class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
function fn<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head || !head.next) return head;
  let res = fn(head.next);
  if (head.val !== res!.val) {
    head.next = res;
    return head;
  } else {
    return res;
  }
}
function fn1<T>(head: ListNode<T> | null) {
  if (!head || !head.next) return head;
  const dummyHead = new ListNode<T>(head.val);
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
