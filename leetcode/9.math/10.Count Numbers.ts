// leetcode 357

export default function countNumbers(n: number) {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 10;
  }
  let res = 10,
    current = 9;
  for (let i = 0; i < n - 1; i++) {
    current *= 9 - i;
    res += current;
  }
  return res;
}
