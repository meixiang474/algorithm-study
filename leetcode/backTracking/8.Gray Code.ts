/**
 * @description leetcode 89
 */

export default function grayCode(n: number): number[] {
  if (n === 0) return [0];
  const codes = grayCode(--n);
  return [...codes, ...codes.map((item) => (1 << n) | item).reverse()];
}
