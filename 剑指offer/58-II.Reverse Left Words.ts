/**
 * @description 剑指offer 58-II
 */

export default function reverseLeftWords(s: string, n: number) {
  const tail = s.slice(n);
  const front = s.slice(0, n);
  return tail + front;
}
