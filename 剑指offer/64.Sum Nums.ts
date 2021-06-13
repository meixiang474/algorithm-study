/**
 * @description 剑指offer 64
 */

export default function sumNums(n: number) {
  n && (n += sumNums(n - 1));
  return n;
}
