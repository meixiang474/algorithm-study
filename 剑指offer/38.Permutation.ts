/**
 * @description 剑指offer 38
 */

export default function permutation(s: string) {
  s = s.split("").sort().join("");
  const map = new Map<number, boolean>();
  const res: string[] = [];
  const backtrack = (path: string) => {
    if (path.length === s.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < s.length; i++) {
      if (i > 0 && s[i] === s[i - 1] && map.get(i - 1)) continue;
      if (!map.get(i)) {
        map.set(i, true);
        backtrack(path + s[i]);
        map.set(i, false);
      }
    }
  };
  backtrack("");
  return res;
}
