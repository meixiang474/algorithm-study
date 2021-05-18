export default function cuttingRope(n: number) {
  const compute = (m: number) => {
    const floor = Math.floor(n / m);
    const ceil = Math.ceil(n / m);
    return Math.max(
      ceil ** (m - 1) * (n - (m - 1) * ceil),
      floor ** (m - 1) * (n - (m - 1) * floor)
    );
  };
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = Math.max(res, compute(i));
  }
  return res;
}
