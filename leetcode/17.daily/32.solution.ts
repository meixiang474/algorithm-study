// leetcode 497

export default class Solution {
  arr: number[] = [0];
  constructor(public rects: number[][]) {
    for (let item of rects) {
      const [a, b, x, y] = item;
      this.arr.push(this.arr[this.arr.length - 1] + (x - a + 1) * (y - b + 1));
    }
  }
  pick() {
    let k = Math.floor(Math.random() * this.arr[this.arr.length - 1]) + 1;
    const rectIndex = this.search(k);
    k -= this.arr[rectIndex - 1];
    const [a, b, x, y] = this.rects[rectIndex - 1];
    const col = y - b + 1;
    const rest = k % col;
    const da = rest ? Math.floor(k / col) : Math.floor(k / col) - 1;
    const db = rest ? rest - 1 : col - 1;
    return [a + da, b + db];
  }
  search(target: number) {
    let l = 0,
      r = this.arr.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (this.arr[mid] >= target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }
}
