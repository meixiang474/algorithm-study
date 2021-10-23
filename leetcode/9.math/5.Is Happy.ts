// leetcode 202

export default function isHappy(n: number) {
  const compute = (n: number) => {
    return n
      .toString()
      .split("")
      .reduce((memo, current) => {
        return memo + parseInt(current) ** 2;
      }, 0);
  };
  const map = new Map<number, boolean>();
  while (!map.has(n)) {
    if (n === 1) return true;
    map.set(n, true);
    n = compute(n);
  }
  return false;
}
