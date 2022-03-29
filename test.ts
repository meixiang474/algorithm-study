// offer 25
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

export function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  if(!A || !B) return false
  const dfs = (A: TreeNode | null, B: TreeNode | null): boolean => {
    if(!B) return true
    if(!A || A.val !== B.val) return false
    return dfs(A.left, B.left) && dfs(A.right, B.right)
  }
  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
}

// array
export class MyArray<T = any> {
  data: T[];
  size: number;
  constructor(size: number = 10) {
    this.data = new Array(size).fill(null);
    this.size = 0;
  }
  getCapacity() {
    return this.data.length;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  resize(newSize: number) {
    const newData = new Array(newSize).fill(newSize);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, e: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size === this.getCapacity()) {
      this.resize(2 * this.size);
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = e;
    this.size++;
  }
  addFirst(e: T) {
    this.add(0, e);
  }
  addLast(e: T) {
    this.add(this.size, e);
  }
  get(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    return this.data[index];
  }
  getFirst() {
    return this.get(0);
  }
  getLast() {
    return this.get(this.size - 1);
  }
  contains(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return true;
    }
    return false;
  }
  find(e: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return i;
    }
    return -1;
  }
  remove(index: number) {
    if (index < 0 || index >= this.size) throw new Error("error");
    const res = this.data[index];
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (
      this.size <= Math.floor(this.getCapacity() / 4) &&
      Math.floor(this.getCapacity() / 2) !== 0
    ) {
      this.resize(Math.floor(this.getCapacity() / 2));
    }
    return res;
  }
  removeFirst() {
    return this.remove(0);
  }
  removeLast() {
    return this.remove(this.size - 1);
  }
  removeElement(e: T) {
    const index = this.find(e);
    if (index < 0) {
      return false;
    }
    this.remove(index);
    return true;
  }
  set(index: number, e: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = e;
  }
  toString() {
    let res = `MyArray: size=${this.size}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}

// leetcode array 26-41
export function removeDuplicates(nums: number[]) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (nums[i] === val) {
      res--;
      for (let j = i; j < res; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}

export function combinationSum(candidates: number[], target: number) {
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) {
      return;
    }
    if (index >= candidates.length) return;
    backtrack(path, sum, index + 1);
    backtrack(path.concat(candidates[index]), sum + candidates[index], index);
  };
  backtrack([], 0, 0);
  return res;
}

export function combineSum(candidates: number[], target: number) {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) return;
    if (index >= candidates.length) return;
    for (let i = index; i < candidates.length; i++) {
      if (i > index && candidates[i] === candidates[i - 1]) continue;
      backtrack(path.concat(candidates[i]), sum + candidates[i], i + 1);
    }
  };
  backtrack([], 0, 0);
  return res;
}

export function firstMissingPositive(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      nums[i] = nums.length + 1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    const current = Math.abs(nums[i]);
    if (current <= nums.length) {
      nums[current - 1] = -Math.abs(nums[current - 1]);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }
  return nums.length + 1;
}
