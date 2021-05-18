// 141
export {};
class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
function fn<T>(head: ListNode<T> | null) {
  let slow: ListNode<T> | null = head;
  let quick: ListNode<T> | null = head;
  while (slow && quick && quick.next) {
    slow = slow.next;
    quick = quick.next.next;
    if (slow === quick) {
      return true;
    }
  }
  return false;
}
