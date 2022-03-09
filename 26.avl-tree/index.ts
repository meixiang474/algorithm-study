class AVLTreeNode<K = number, V = any> {
  key: K;
  value: V;
  height: number;
  left: AVLTreeNode<K, V> | null;
  right: AVLTreeNode<K, V> | null;
  constructor(key: K, value: V) {
    this.height = 1;
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class AVLTree<K = number, V = any> {
  root: AVLTreeNode<K, V> | null;
  size: number;
  constructor(compare?: (a: K, b: K) => boolean) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  compare(a: K, b: K) {
    return a < b;
  }
  // 获取每个节点的高度值
  getHeight(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return node.height;
  }
  // 获取每个节点的平衡因子
  getBalanceFactor(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  add(key: K, value: V) {
    this.root = this.addNode(key, value, this.root);
  }
  addNode(key: K, value: V, node: AVLTreeNode<K, V> | null) {
    if (!node) {
      this.size++;
      return new AVLTreeNode(key, value);
    }
    if (this.compare(key, node.key)) {
      node.left = this.addNode(key, value, node.left);
    } else if (this.compare(node.key, key)) {
      node.right = this.addNode(key, value, node.right);
    } else {
      node.value = value;
    }
    // 更新height
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) {
      // 此时不是一个平衡二叉树
    }
    return node;
  }
  getNode(node: AVLTreeNode<K, V> | null, key: K): AVLTreeNode<K, V> | null {
    if (!node) return null;
    if (this.compare(node.key, key)) {
      return this.getNode(node.right, key);
    } else if (this.compare(key, node.key)) {
      return this.getNode(node.left, key);
    } else {
      return node;
    }
  }
  contains(key: K) {
    return this.getNode(this.root, key) != null;
  }
  get(key: K) {
    const node = this.getNode(this.root, key);
    return node == null ? null : node.value;
  }
  set(key: K, value: V) {
    const node = this.getNode(this.root, key);
    if (node == null) throw new Error("error");
    node.value = value;
  }
  minimumNode(node: AVLTreeNode<K, V>): AVLTreeNode<K, V> {
    if (!node.left) {
      return node;
    }
    return this.minimumNode(node.left);
  }
  removeMinNode(node: AVLTreeNode<K, V>) {
    if (!node.left) {
      this.size--;
      return node.right;
    }
    node.left = this.removeMinNode(node.left);
    return node;
  }
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (node == null) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: AVLTreeNode<K, V> | null, key: K) {
    if (!node) {
      return null;
    }
    if (this.compare(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (!node.left) {
        this.size--;
        return node.right;
      }
      if (!node.right) {
        this.size--;
        return node.left;
      }
      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMinNode(node.right);
      return successor;
    }
  }
}
