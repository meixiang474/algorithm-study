/**
 * @description 剑指offer 58-I
 */

export default function reverseWords(s: string) {
  const res: string[] = [];
  s = s.trim();
  let i = s.length - 1;
  while (i >= 0) {
    if (s[i] !== " ") {
      let j = i;
      while (s[j] !== " " && j >= 0) {
        j--;
      }
      res.push(s.slice(j + 1, i + 1));
      i = j - 1;
    } else {
      i--;
    }
  }
  return res.join(" ");
}
