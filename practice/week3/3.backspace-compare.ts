// leetcode 844

export default function backspaceCompare(s: string, t: string) {
  let sIndex = s.length - 1,
    tIndex = t.length - 1;
  let sSkips = 0,
    tSkips = 0;
  while (sIndex >= 0 || tIndex >= 0) {
    while (sIndex >= 0) {
      if (s[sIndex] === "#") {
        sIndex--;
        sSkips++;
      } else if (sSkips > 0) {
        sSkips--;
        sIndex--;
      } else {
        break;
      }
    }
    while (tIndex >= 0) {
      if (t[tIndex] === "#") {
        tIndex--;
        tSkips++;
      } else if (tSkips > 0) {
        tSkips--;
        tIndex--;
      } else {
        break;
      }
    }
    if (sIndex >= 0 && tIndex >= 0) {
      if (s[sIndex] !== t[tIndex]) return false;
    } else {
      if (sIndex >= 0 || tIndex >= 0) return false;
    }
    sIndex--;
    tIndex--;
  }
  return true;
}
