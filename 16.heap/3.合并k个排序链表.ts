// 23
import MinHeap from "./MinHeap";

class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
const mergeKLists = (lists: (ListNode | null)[]): ListNode | null => {
  const res = new ListNode(-1);
  const heap = new MinHeap<ListNode>((a, b) => {
    return a.val < b.val;
  });
  lists.forEach((item) => {
    if (item) heap.insert(item);
  });
  let p = res;
  while (heap.size()) {
    const current = heap.pop()!;
    p.next = current;
    p = p.next;
    if (current.next) heap.insert(current.next);
  }
  return res.next;
};
