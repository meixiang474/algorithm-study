// offer 48
export function nthUglyNumber(n: number) {
  const dp = [1];
  let a = 0,
    b = 0,
    c = 0;
  for (let i = 1; i < n; i++) {
    const A = dp[a] * 2;
    const B = dp[b] * 3;
    const C = dp[c] * 5;
    const current = Math.min(A, B, C);
    dp[i] = current;
    if (current === A) {
      a++;
    }
    if (current === B) {
      b++;
    }
    if (current === C) {
      c++;
    }
  }
  return dp[n - 1];
}

// leetcode array 18
export function fourSum(nums: number[], target: number) {
  const res: number[][] = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      nums[i] +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (
        nums[i] + nums[j] + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const cl = nums[l];
        const cr = nums[r];
        const sum = nums[i] + nums[j] + cl + cr;
        if (sum === target) {
          res.push([nums[i], nums[j], cl, cr]);
          while (l < r) {
            l++;
            if (nums[l] !== cl) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== cr) break;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== cr) break;
          }
        } else {
          while (l < r) {
            l++;
            if (nums[l] !== cl) break;
          }
        }
      }
    }
  }
  return res;
}

// array
export class MyArray<T> {
  data: T[];
  size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity).fill(null);
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
  resize(newCapacity: number) {
    const newData: T[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  add(index: number, e: T) {
    if (index < 0 || index > this.size) throw new Error("error");
    if (this.size === this.getCapacity()) {
      this.resize(2 * this.getCapacity());
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
      if (this.data[i] === e) {
        return true;
      }
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
    if (index !== -1) {
      this.remove(index);
      return true;
    }
    return false;
  }
  set(index: number, e: T) {
    if (index < 0 || index >= this.size) throw new Error("error");
    this.data[index] = e;
  }
  toString() {
    let res = `Array: size=${this.size}, capacity=${this.getCapacity()}\r\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += JSON.stringify(this.data[i]) + ",";
    }
    res = res.slice(0, -1) + "]";
    return res;
  }
}
