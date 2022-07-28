// leetcode 338

export default function countBits(n: number) {
  const res: number[] = new Array(n + 1).fill(0);
  let hightBit = 0;
  for (let i = 1; i <= n; i++) {
    if ((i & (i - 1)) === 0) {
      hightBit = i;
    }
    res[i] = res[i - hightBit] + 1;
  }
  return res;
}
