// 206
export {};
class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
function reverse<T>(head: ListNode<T> | null) {
  let prev = null;
  let current = head;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
function reverse1<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head || !head.next) return head;
  let res = reverse1(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}
