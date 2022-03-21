// offer 23
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}

export function reverseList1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let prev = null,
    current: ListNode | null = head;
  while (current) {
    const next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// avl-tree
export class AVLTreeNode<K = number, V = any> {
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
  isBST() {
    const keys: K[] = [];
    this.inorder(this.root, keys);
    for (let i = 1; i < keys.length; i++) {
      if (!this.compare(keys[i - 1], keys[i])) return false;
    }
    return true;
  }
  inorder(node: AVLTreeNode<K, V> | null, keys: K[]) {
    if (node == null) return;
    this.inorder(node.left, keys);
    keys.push(node.key);
    this.inorder(node.right, keys);
  }
  isBalancedNode(node: AVLTreeNode<K, V> | null): boolean {
    if (node == null) return true;
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) return false;
    return this.isBalancedNode(node.left) && this.isBalancedNode(node.right);
  }
  getBalanceFactor(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  getHeight(node: AVLTreeNode<K, V> | null) {
    if (!node) return 0;
    return node.height;
  }
  rightRotate(y: AVLTreeNode<K, V>) {
    const x = y.left!;
    const T3 = x.right;
    x.right = y;
    y.left = T3;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }
  leftRotate(y: AVLTreeNode<K, V>) {
    const x = y.right!;
    const T2 = x.left;
    y.right = T2;
    x.left = y;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
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
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    } else if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
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
    if (!node.left) return node;
    return this.minimumNode(node.left);
  }
  remove(key: K) {
    const node = this.getNode(this.root, key);
    if (node == null) return null;
    this.root = this.removeNode(this.root, key);
    return node.value;
  }
  removeNode(node: AVLTreeNode<K, V> | null, key: K): AVLTreeNode<K, V> | null {
    if (!node) return null;
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
      1 + Math.max(this.getHeight(resNode.left), this.getHeight(node.right));
    const balanceFactor = this.getBalanceFactor(resNode);
    if (balanceFactor > 1 && this.getBalanceFactor(resNode.left) >= 0) {
      return this.rightRotate(resNode);
    }
    if (balanceFactor < -1 && this.getBalanceFactor(resNode.right) <= 0) {
      return this.leftRotate(resNode);
    }
    if (balanceFactor > 1 && this.getBalanceFactor(resNode.left) < 0) {
      resNode.left = this.leftRotate(resNode.left!);
      return this.rightRotate(resNode);
    }
    if (balanceFactor < -1 && this.getBalanceFactor(resNode.right) > 0) {
      resNode.right = this.rightRotate(resNode.right!);
      return this.leftRotate(resNode);
    }
    return resNode;
  }
}

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
  add(key: K, value: V) {
    this.avl.add(key, value);
  }
  contains(key: K) {
    return this.avl.contains(key);
  }
  get(key: K) {
    return this.avl.get(key);
  }
  set(key: K, value: V) {
    this.avl.set(key, value);
  }
  remove(key: K) {
    return this.avl.remove(key);
  }
}

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
    return this.avl.remove(e);
  }
}

// two-ponters 1-5

export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = l;
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function maxArea(nums: number[]) {
  let res = 0;
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const currentl = nums[l];
    const currentr = nums[r];
    res = Math.max(res, Math.min(currentl, currentr) * (r - l));
    if (currentl > currentr) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}

export function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: [number, number, number][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (current > 0) break;
    if (i > 0 && nums[i - 1] === current) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = currentl + currentr + current;
      if (sum === 0) {
        res.push([currentl, currentr, current]);
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else if (sum > 0) {
        while (l < r) {
          r--;
          if (nums[r] !== currentr) break;
        }
      } else {
        while (l < r) {
          l++;
          if (nums[l] !== currentl) break;
        }
      }
    }
  }
  return res;
}

export function threeSumClosest(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  let res = 0;
  let diff = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    let isEqual = false;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentl = nums[l];
      const currentr = nums[r];
      const sum = currentl + currentr + current;
      const newDiff = Math.abs(sum - target);
      if (newDiff < diff) {
        res = sum;
        diff = newDiff;
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        }
      }
      if (isEqual) break;
    }
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: [number, number, number, number][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && current === nums[i - 1]) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (j > i + 1 && currentj === nums[j - 1]) continue;
      if (current + currentj + nums[j + 1] + nums[j + 2] > target) break;
      if (
        current + currentj + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const currentl = nums[l];
        const currentr = nums[r];
        const sum = currentl + currentr + current + currentj;
        if (sum === target) {
          res.push([currentl, currentr, currentj, current]);
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        }
      }
    }
  }
  return res;
}
