import { LinkedList } from "../7.LinkedList";

export default class LinkListSet<T = number> {
  list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList<T>(-1 as any);
  }
  getSize() {
    return this.list.getSize();
  }
  isEmpty() {
    return this.list.isEmpty();
  }
  contains(e: T) {
    return this.list.contains(e);
  }
  add(e: T) {
    if (!this.list.contains(e)) {
      this.list.addFirst(e);
    }
  }
  remove(e: T) {
    this.list.removeElement(e);
  }
}
