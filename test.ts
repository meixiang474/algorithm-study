// offer 52
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  const map = new Map<ListNode, boolean>();
  let prevA: ListNode | null = headA;
  while (prevA) {
    map.set(prevA, true);
    prevA = prevA.next;
  }
  let prevB: ListNode | null = headB;
  while (prevB) {
    if (map.has(prevB)) {
      return prevB;
    }
    prevB = prevB.next;
  }
  return null;
}

// leetcode array 39
export function combinationSum(nums: number[], target: number) {
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) return;
    if (index >= nums.length) return;
    backtrack(path, sum, index + 1);
    backtrack([...path, nums[index]], sum + nums[index], index);
  };
  backtrack([], 0, 0);
  return res;
}

// linked list

export class LinkedList {
  dummyHead: ListNode;
  size: number;
  constructor() {
    this.dummyHead = new ListNode(-1);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(index: number, val: number) {
    if (index < 0 || index > this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(val);
    prev.next.next = next;
    this.size++;
  }
  addFirst(val: number) {
    this.add(0, val);
  }
  addLast(val: number) {
    this.add(this.size, val);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current: ListNode = this.dummyHead.next!;
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
  set(index: number, val: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current: ListNode = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    current.val = val;
  }
  contains(val: number) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let prev: ListNode = this.dummyHead;
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
  removeElement(val: number) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.val === val) {
        break;
      } else {
        prev = prev.next;
      }
    }
    if (prev.next) {
      prev.next = prev.next.next;
      this.size--;
    }
  }
  toString() {
    let res = `LinkedList: size=${this.size}\r\n`;
    let current = this.dummyHead.next;
    while (current) {
      res += JSON.stringify(current.val) + "->";
      current = current.next;
    }
    res = res + "Null";
    return res;
  }
}

export function removeElements(head: ListNode | null, target: number) {
  while (head && head.val === target) {
    head = head.next;
  }
  if (!head) return head;
  let prev = head;
  while (prev.next) {
    if (prev.next.val === target) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return head;
}

export function removeElements2(
  head: ListNode | null,
  target: number
): ListNode | null {
  if (!head) return head;
  const res = removeElements2(head.next, target);
  if (head.val === target) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function reverse(head: ListNode | null) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

export function reverse2(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverse2(head.next);
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
    let n1 = p1 ? p1.val : 0;
    let n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) {
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
  if (!head || !head.next) return false;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
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
  let l1 = head;
  let p1: ListNode | null = l1;
  let p2 = l2;
  while (p1 && p2) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}
