import { AVLTree } from ".";

export class AVLSet<T = number> {
  avl: AVLTree<T>;
  constructor(compare?: (a: T, b: T) => boolean) {
    this.avl = new AVLTree(compare);
  }
  getSize() {
    return this.avl.getSize();
  }
  isEmpty() {
    return this.avl.isEmpty();
  }
  add(e: T) {
    this.avl.add(e, null);
  }
  contains(e: T) {
    return this.avl.contains(e);
  }
  remove(e: T) {
    this.avl.remove(e);
  }
}
