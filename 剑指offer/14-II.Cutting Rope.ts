export default function cuttingRope(n: number) {
  const arr = [0, 0, 1, 2, 4];
  if (n < 5) {
    return arr[n];
  }
  let res = 1;
  while (n >= 5) {
    res = (res * 3) % 1000000007;
    n -= 3;
  }
  return (res * n) % 1000000007;
}
