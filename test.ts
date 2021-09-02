// 33

export function verifyPostorder(postorder: number[]): boolean {
  if (postorder.length === 0 || postorder.length === 1) return true;
  const upper = (arr: number[], target: number) => {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (arr[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };

  const isTree = (
    postorder: number[],
    rootValue: number,
    rightIndex: number
  ) => {
    const left = postorder.slice(0, rightIndex);
    const right = postorder.slice(rightIndex, -1);
    return (
      left.every((item) => item < rootValue) &&
      right.every((item) => item > rootValue)
    );
  };

  const rootValue = postorder[postorder.length - 1];
  const rightIndex = upper(postorder.slice(0, -1), rootValue);
  const flag = isTree(postorder, rootValue, rightIndex);
  if (flag) {
    return (
      verifyPostorder(postorder.slice(0, rightIndex)) &&
      verifyPostorder(postorder.slice(rightIndex, -1))
    );
  } else {
    return false;
  }
}
// linklist
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList {
  dummyHead: ListNode;
  size: number;
  constructor(dummyHead = -1) {
    this.dummyHead = new ListNode(dummyHead);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(index: number, item: number) {
    if (index < 0 || index > this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(item);
    prev.next = next;
    this.size++;
  }
  addFirst(item: number) {
    this.add(0, item);
  }
  addLast(item: number) {
    this.add(this.size, item);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current.val;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  set(index: number, item: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    current.val = item;
  }
  contains(item: number) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.val === item) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const res = prev.next!;
    prev.next = prev.next!.next;
    this.size--;
    return res.val;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(item: number) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.val === item) {
        break;
      } else {
        prev = prev.next;
      }
    }
    if (prev.next) {
      this.size--;
      prev.next = prev.next.next;
    }
  }
  toString() {
    let res = `LinkedList: size=${this.getSize()}\r\n`;
    let current = this.dummyHead.next;
    while (current) {
      res += JSON.stringify(current.val) + "->";
      current = current.next;
    }
    return res + "NULL";
  }
}

export function removeElements(head: ListNode | null, val: number) {
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

export function removeElements1(head: ListNode | null, val: number) {
  const dummyHead = new ListNode(-1);
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

export function removeElements2(
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return head;
  const res = removeElements2(head.next, val);
  if (head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverse(head: ListNode | null) {
  let prev = null,
    current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

export function reverse1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}

export function addTwo(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const num1 = p1 ? p1.val : 0;
    const num2 = p2 ? p2.val : 0;
    const sum = num1 + num2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry !== 0) {
    p3.next = new ListNode(carry);
  }
  return l3.next;
}

export function fn(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = fn(head.next);
  if (res && head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function fn1(head: ListNode | null) {
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

export function fn2(head: ListNode | null) {
  let slow = head;
  let fast = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

export function fn3(head: ListNode | null) {
  if (!head || !head.next) return true;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast) {
    slow = slow!.next;
  }
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let l2 = prev;
  let l1: ListNode | null = head;
  while (l2 && l1) {
    if (l1.val !== l2.val) {
      return false;
    }
    l1 = l1.next;
    l2 = l2.next;
  }
  return true;
}
