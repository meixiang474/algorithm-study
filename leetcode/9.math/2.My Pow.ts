// leetcode 50

export default function myPow(x: number, n: number) {
  const isNegative = n < 0;
  n = isNegative ? -n : n;
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNegative ? 1 / absPow(x, n) : absPow(x, n);
}
