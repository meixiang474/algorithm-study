// 234

export {};
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null) {
    this.value = value;
    this.next = next;
  }
}

function fn<T>(head: ListNode<T> | null) {
  if (!head || !head.next) return true;
  let slow: ListNode<T> | null = head;
  let quick: ListNode<T> | null = head;
  while (slow && quick && quick.next) {
    slow = slow.next;
    quick = quick.next.next;
  }
  if (quick) {
    slow = slow!.next;
  }
  let prev = null;
  let current = slow;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  slow = prev;
  quick = head;
  while (slow) {
    if (quick!.value !== slow.value) {
      return false;
    }
    quick = quick!.next;
    slow = slow.next;
  }
  return true;
}
