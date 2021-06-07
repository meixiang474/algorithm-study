/**
 * @description leetcode 69
 */

export default function mySqrt(x: number): number {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= x) {
      l = mid;
    } else if (mid ** 2 > x) {
      r = mid - 1;
    }
  }
  return l;
}
