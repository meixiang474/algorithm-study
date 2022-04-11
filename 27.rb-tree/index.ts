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
  leftRotate(node: RBTreeNode<K, V>) {
    const x = node.right!;
    const T2 = x.left;
    node.right = T2;
    x.left = node;
    x.color = node.color;
    // node 和 x 形成了一个3节点
    node.color = COLOR_MAP.RED;
    return x;
  }
  // add(key: K, value: V) {
  //   this.root = this.addNode(this.root, key, value);
  //   this.root.color = COLOR_MAP.BLACK;
  // }
  // addNode(node: RBTreeNode<K, V> | null, key: K, value: V): RBTreeNode<K, V> {
  //   if (node == null) {
  //     this.size++;
  //   }
  // }
}
