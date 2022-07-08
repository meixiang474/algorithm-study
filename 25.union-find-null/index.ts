// 并查集

export class UnionFind1 {
  id: number[];
  constructor(size: number) {
    this.id = new Array(size).fill(0).map((item, index) => index);
  }
  getSize() {
    return this.id.length;
  }
  // 查找元素的集合编号
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
  // 每课树的节点数
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
  // 每课树的高度
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
  // 每课树的高度
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
      // 路径压缩
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
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
  }
}

export class UnionFind6 {
  parent: number[];
  // 每课树的高度
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
      // 路径压缩
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
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
  }
}
