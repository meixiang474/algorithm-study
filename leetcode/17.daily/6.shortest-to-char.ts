// leetcode 821

export default function shortestToChar(s: string, c: string) {
  const res: number[] = [];
  let cIndex = -Infinity;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      cIndex = i;
    }
    res[i] = i - cIndex;
  }
  cIndex = Infinity;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === c) {
      cIndex = i;
    }
    res[i] = Math.min(res[i], cIndex - i);
  }
  return res;
}
