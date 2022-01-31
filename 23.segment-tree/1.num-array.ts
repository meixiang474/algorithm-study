// leetcode 303

export default class NumArray {
  data: number[];
  tree: (number | null)[];
  constructor(nums: number[]) {
    this.data = [...nums];
    this.tree = new Array(this.data.length * 4).fill(null);
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftIndex = this.getLeftIndex(treeIndex);
    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    this.buildSegmentTree(leftIndex, l, mid);
    this.buildSegmentTree(rightIndex, mid + 1, r);
    this.tree[treeIndex] = this.merge(
      this.tree[leftIndex]!,
      this.tree[rightIndex]!
    );
  }
  merge(a: number, b: number) {
    return a + b;
  }
  getLeftIndex(index: number) {
    return 2 * index + 1;
  }
  getRightIndex(index: number) {
    return 2 * index + 2;
  }
  sumRange(left: number, right: number): number {
    if (
      left < 0 ||
      left >= this.data.length ||
      right < 0 ||
      right >= this.data.length ||
      left > right
    ) {
      throw new Error("error");
    }
    return this.query(0, 0, this.data.length - 1, left, right);
  }
  query(
    treeIndex: number,
    l: number,
    r: number,
    queryl: number,
    queryr: number
  ): number {
    if (l === queryl && r === queryr) return this.tree[treeIndex]!;
    const leftIndex = this.getLeftIndex(treeIndex);

    const rightIndex = this.getRightIndex(treeIndex);
    const mid = Math.floor(l + (r - l) / 2);
    if (queryl >= mid + 1) {
      return this.query(rightIndex, mid + 1, r, queryl, queryr);
    }
    if (queryr <= mid) {
      return this.query(leftIndex, l, mid, queryl, queryr);
    }
    return this.merge(
      this.query(leftIndex, l, mid, queryl, mid),
      this.query(rightIndex, mid + 1, r, mid + 1, queryr)
    );
  }
}

export class NumArray1 {
  // 前 i 个元素的和
  sum: number[];
  constructor(nums: number[]) {
    this.sum = new Array(nums.length + 1).fill(0);
    for (let i = 1; i < this.sum.length; i++) {
      this.sum[i] = this.sum[i - 1] + nums[i - 1];
    }
  }
  sumRange(left: number, right: number) {
    return this.sum[right + 1] - this.sum[left];
  }
}
