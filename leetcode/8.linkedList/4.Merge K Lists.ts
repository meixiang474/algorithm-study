// leetcode 23

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const merge = (
    lists: (ListNode | null)[],
    l: number,
    r: number
  ): ListNode | null => {
    if (l === r) return lists[l];
    if (l > r) return null;
    const mid = Math.floor(l + (r - l) / 2);
    return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r));
  };
  const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null) => {
    const l3 = new ListNode(-1);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    while (p1 && p2) {
      if (p1.val < p2.val) {
        p3.next = p1;
        p1 = p1.next;
      } else {
        p3.next = p2;
        p2 = p2.next;
      }
      p3 = p3.next;
    }
    if (p1) {
      p3.next = p1;
    }
    if (p2) {
      p3.next = p2;
    }
    return l3.next;
  };
  return merge(lists, 0, lists.length - 1);
}
