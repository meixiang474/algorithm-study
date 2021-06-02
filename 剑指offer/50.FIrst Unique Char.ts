/**
 * @description
 */

export default function firstUniqueChar(s: string) {
  const map = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], map.has(s[i]) ? map.get(s[i])! + 1 : 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return s[i];
    }
  }
  return " ";
}
