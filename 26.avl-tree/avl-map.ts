import { AVLTree } from ".";

export class AVLMap<K = number, V = any> {
  avl: AVLTree<K, V>;
  constructor(compare?: (a: K, b: K) => boolean) {
    this.avl = new AVLTree(compare);
  }
  getSize() {
    return this.avl.getSize();
  }
  isEmpty() {
    return this.avl.isEmpty();
  }
  add(key: K, val: V) {
    this.avl.add(key, val);
  }
  contains(key: K) {
    return this.avl.contains(key);
  }
  get(key: K) {
    return this.avl.get(key);
  }
  set(key: K, val: V) {
    this.avl.set(key, val);
  }
  remove(key: K) {
    return this.avl.remove(key);
  }
}
