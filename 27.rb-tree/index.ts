export const COLOR_MAP = {
  RED: true,
  BLACK: false,
};

export class RBTreeNode<K = number, V = any> {
  key: K;
  value: V;
  left: RBTreeNode<K, V> | null;
  right: RBTreeNode<K, V> | null;
  color: boolean;
  constructor(key: K, value: V, color: boolean = COLOR_MAP.RED) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = color;
  }
}

export class RBTree<K = number, V = any> {
  root: RBTreeNode<K, V> | null;
  size: number;
  constructor(compare: (a: K, b: K) => boolean) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  compare(a: K, b: K) {
    return a < b;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  isRed(node: RBTreeNode<K, V> | null) {
    if (node == null) return COLOR_MAP.BLACK;
    return COLOR_MAP.RED;
  }
}
