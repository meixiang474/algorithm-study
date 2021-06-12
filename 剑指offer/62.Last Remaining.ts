/**
 * @description 剑指offer 62
 */

export default function lastRemaining(n: number, m: number) {
  const f = (n: number, m: number): number => {
    if (n === 1) return 0;
    const x = f(n - 1, m);
    return (m + x) % n;
  };
  return f(n, m);
}
