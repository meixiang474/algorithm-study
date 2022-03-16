// offer 21
export function exchange(nums: number[]) {
  const res: number[] = [];
  for (let item of nums) {
    if (item % 2 === 0) {
      res.push(item);
    } else {
      res.unshift(item);
    }
  }
  return res;
}

// union-find
export class UnionFind1 {
  id: number[];
  constructor(size: number) {
    this.id = new Array(size).fill(0).map((item, index) => index);
  }
  getSize() {
    return this.id.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.id.length) throw new Error("error");
    return this.id[p];
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pID = this.find(p);
    const qID = this.find(q);
    if (pID === qID) return;
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pID) {
        this.id[i] = qID;
      }
    }
  }
}

export class UnionFind2 {
  parent: number[];
  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((item, index) => index);
  }
  getSize() {
    return this.parent.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.parent.length) throw new Error("error");
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    this.parent[pRoot] = qRoot;
  }
}

export class UnionFind3 {
  parent: number[];
  sz: number[];
  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((item, index) => index);
    this.sz = new Array(size).fill(1);
  }
  getSize() {
    return this.parent.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.parent.length) throw new Error("error");
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.parent[pRoot] = qRoot;
      this.sz[qRoot] += this.sz[pRoot];
    } else {
      this.parent[qRoot] = pRoot;
      this.sz[pRoot] += this.sz[qRoot];
    }
  }
}

export class UnionFind4 {
  parent: number[];
  rank: number[];
  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((item, index) => index);
    this.rank = new Array(size).fill(1);
  }
  getSize() {
    return this.parent.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.parent.length) throw new Error("error");
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
  }
}

export class UnionFind5 {
  parent: number[];
  rank: number[];
  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((item, index) => index);
    this.rank = new Array(size).fill(1);
  }
  getSize() {
    return this.parent.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.parent.length) throw new Error("error");
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
  }
}

export class UnionFind6 {
  parent: number[];
  rank: number[];
  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((item, index) => index);
    this.rank = new Array(size).fill(1);
  }
  getSize() {
    return this.parent.length;
  }
  find(p: number) {
    if (p < 0 || p >= this.parent.length) throw new Error("error");
    if (p !== this.parent[p]) {
      this.parent[p] = this.find(this.parent[p]);
    }
    return this.parent[p];
  }
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
  unionElements(p: number, q: number) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
  }
}

// tree 1-5

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  const res: number[] = [];
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    res.push(current.val);
    p = current.right;
  }
  return res;
}

export function inorderTraversal1(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export function numsTree(n: number) {
  const dp = [1, 1];
  for (let i = 1; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] = dp[i] + dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}
