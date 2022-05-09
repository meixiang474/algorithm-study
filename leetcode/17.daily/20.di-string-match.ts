// leetcode 942

export default function diStringMatch(s: string) {
  const res: number[] = [];
  let min = 0,
    max = s.length;
  for (let i = 0; i < s.length; i++) {
    res[i] = s[i] === "I" ? min++ : max--;
  }
  res[s.length] = min;
  return res;
}
