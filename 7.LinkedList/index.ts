export {};
class ListNode<T> {
  public e: T;
  public next: ListNode<T> | null;
  constructor(e: T, next: ListNode<T> | null = null) {
    this.e = e;
    this.next = next;
  }
}
class LinkedList<T> {
  private dummyHead: ListNode<T>;
  private size: number;
  constructor(dummyHead: T) {
    this.dummyHead = new ListNode(dummyHead);
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(index: number, e: T) {
    if (index < 0 || index > this.size) throw new Error('error');
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    prev.next = new ListNode<T>(e, prev.next);
    this.size++;
  }
  addFirst(e: T) {
    this.add(0, e);
  }
  addLast(e: T) {
    this.add(this.size, e);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error('error');
    let current = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.e;
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  set(index: number, e: T) {
    if (index < 0 || index >= this.size) throw new Error('error');
    let current = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    current!.e = e;
  }
  contains(e: T) {
    let current = this.dummyHead.next;
    while (current) {
      if (current.e === e) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error('error');
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next!;
    }
    const res = prev.next!.e;
    prev.next = prev.next!.next;
    this.size--;
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(e: T) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.e === e) {
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
    let res = ``;
    let current = this.dummyHead.next;
    while (current) {
      res += JSON.stringify(current.e) + '->';
      current = current.next;
    }
    res += 'NULL';
    return res;
  }
}
