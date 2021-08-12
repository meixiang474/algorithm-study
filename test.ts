// 11
export const minArray = (nums: number[]) => {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] < nums[r]) {
      r = mid;
    } else if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r--;
    }
  }
  return nums[l];
};

// 12
export const exist = (board: string[][], word: string) => {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (row: number, col: number, index: number): boolean => {
    if (index === word.length - 1) return true;
    const temp = board[row][col];
    board[row][col] = "";
    const flag = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index++]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
    });
    if (flag) {
      return true;
    }
    board[row][col] = temp;
    return false;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) return true;
      }
    }
  }
  return false;
};

// linkedlist
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
  add(index: number, e: number) {
    if (index < 0 || index > this.size) throw new Error("error");
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const next = prev.next;
    prev.next = new ListNode(e);
    prev.next.next = next;
    this.size++;
  }
  addFirst(e: number) {
    this.add(0, e);
  }
  addLast(e: number) {
    this.add(this.size, e);
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
  set(index: number, e: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    current.val = e;
  }
  contains(e: number) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.val === e) {
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
  removeElement(e: number) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.val === e) {
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
    let res = "";
    let current = this.dummyHead.next;
    while (current) {
      res += current.val + "->";
      current = current.next;
    }
    res += "NULL";
    return res;
  }
}

export const removeElements = (head: ListNode | null, val: number) => {
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
};

export const removeElements1 = (head: ListNode | null, val: number) => {
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
};

export const removeElements2 = (
  head: ListNode | null,
  val: number
): ListNode | null => {
  if (!head) return head;
  const res = removeElements2(head.next, val);
  if (head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
};

export const reverse = (head: ListNode | null) => {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};

export const reverse1 = (head: ListNode | null): ListNode | null => {
  if (!head || !head.next) return head;
  const res = reverse1(head.next);
  head.next.next = head;
  head.next = null;
  return res;
};

export const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null) => {
  let p1 = l1;
  let p2 = l2;
  const l3 = new ListNode(-1);
  let p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const num1 = p1 ? p1.val : 0;
    const num2 = p2 ? p2.val : 0;
    p3.next = new ListNode((num1 + num2 + carry) % 10);
    carry = Math.floor((num1 + num2 + carry) / 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next;
};

export const fn = (head: ListNode | null): ListNode | null => {
  if (!head || !head.next) return head;
  const res = fn(head.next)!;
  if (head.val === res.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
};

export const fn1 = (head: ListNode | null) => {
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
};

export const fn2 = (head: ListNode | null) => {
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
};

export const fn3 = (head: ListNode | null) => {
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
  let h1 = prev;
  let p1 = h1;
  let p2: ListNode | null = head;
  while (p1 && p2) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
};
