// leetcode 205

export default function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const smap = new Map<string, string>();
  const tmap = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    const scurrent = s[i];
    const tcurrent = t[i];
    if (
      (smap.has(scurrent) && smap.get(scurrent) !== tcurrent) ||
      (tmap.has(tcurrent) && tmap.get(tcurrent) !== scurrent)
    ) {
      return false;
    }
    smap.set(scurrent, tcurrent);
    tmap.set(tcurrent, scurrent);
  }
  return true;
}
