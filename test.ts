// offer 58-I

export function reverseWords(s: string) {
  const res: string[] = [];
  s = s.trim();
  let i = s.length - 1;
  while (i >= 0) {
    if (s[i] !== " ") {
      let j = i;
      while (s[j] !== " " && j >= 0) {
        j--;
      }
      res.push(s.slice(j + 1, i + 1));
      i = j - 1;
    } else {
      i--;
    }
  }
  return res.join(" ");
}

// linked list

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
  constructor(dummyHead: number) {
    this.dummyHead = new ListNode(dummyHead);
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
    let current = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.val;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  set(index: number, val: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    let current = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    current!.val = val;
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
  removeElement(val: number) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.val === val) break;
      prev = prev.next;
    }
    if (prev.next) {
      this.size--;
      prev.next = prev.next.next;
    }
  }
  toString() {
    let res = "";
    let current = this.dummyHead.next;
    while (current) {
      res += JSON.stringify(current.val) + "->";
      current = current.next;
    }
    return res + "NULL";
  }
}
