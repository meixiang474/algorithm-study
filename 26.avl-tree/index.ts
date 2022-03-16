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
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  // 判断是否是一个二分搜索树
  isBST() {
    const keys: K[] = [];
    this.inorder(this.root, keys);
    for (let i = 1; i < keys.length; i++) {
      if (!this.compare(keys[i - 1], keys[i])) return false;
    }
    return true;
  }
  // 判断是否平衡
  isBalanced() {
    return this.isBalancedNode(this.root);
  }
  isBalancedNode(node: AVLTreeNode<K, V> | null): boolean {
    if (node == null) return true;
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) return false;
    return this.isBalancedNode(node.left) && this.isBalancedNode(node.right);
  }
  inorder(node: AVLTreeNode<K, V> | null, keys: K[]) {
    if (node == null) {
      return;
    }
    this.inorder(node.left, keys);
    keys.push(node.key);
    this.inorder(node.right, keys);
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
  // 右旋转
  rightRotate(y: AVLTreeNode<K, V>) {
    const x = y.left!;
    const T3 = x.right;
    x.right = y;
    y.left = T3;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }
  // 左旋转
  leftRotate(y: AVLTreeNode<K, V>) {
    const x = y.right!;
    const T2 = x.left;
    x.left = y;
    y.right = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
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
    // 不平衡原因，左侧的左侧多添加了一个节点
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    // 不平衡原因，右侧的右侧多添加了一个节点
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }
    // LR
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }
    // RL
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
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
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (node == null) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: AVLTreeNode<K, V> | null, key: K): AVLTreeNode<K, V> | null {
    if (!node) {
      return null;
    }
    let resNode: AVLTreeNode<K, V> | null = null;
    if (this.compare(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      resNode = node;
    } else if (this.compare(node.key, key)) {
      node.right = this.removeNode(node.right, key);
      resNode = node;
    } else {
      if (!node.left) {
        this.size--;
        resNode = node.right;
      } else if (!node.right) {
        this.size--;
        resNode = node.left;
      } else {
        const successor = this.minimumNode(node.right);
        successor.left = node.left;
        successor.right = this.removeNode(node.right, successor.key);
        resNode = successor;
      }
    }
    if (!resNode) return resNode;
    resNode.height =
      1 + Math.max(this.getHeight(resNode.left), this.getHeight(resNode.right));
    const balanceFactor = this.getBalanceFactor(resNode);
    // 不平衡原因，左侧的左侧多添加了一个节点
    if (balanceFactor > 1 && this.getBalanceFactor(resNode.left) >= 0) {
      return this.rightRotate(resNode);
    }
    // 不平衡原因，右侧的右侧多添加了一个节点
    if (balanceFactor < -1 && this.getBalanceFactor(resNode.right) <= 0) {
      return this.leftRotate(resNode);
    }
    // LR
    if (balanceFactor > 1 && this.getBalanceFactor(resNode.left) < 0) {
      resNode.left = this.leftRotate(resNode.left!);
      return this.rightRotate(resNode);
    }
    // RL
    if (balanceFactor < -1 && this.getBalanceFactor(resNode.right) > 0) {
      resNode.right = this.rightRotate(resNode.right!);
      return this.leftRotate(resNode);
    }
    return resNode;
  }
}
