// leetcode 647

export default function countSubstrings(s: string) {
  let res = 0;
  for (let i = 0; i < 2 * s.length - 1; i++) {
    let l = Math.floor(i / 2),
      r = Math.floor(i / 2) + (i % 2);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      res++;
      l--;
      r++;
    }
  }
  return res;
}
