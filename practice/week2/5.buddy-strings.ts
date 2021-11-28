// leetcode 859

export default function buddyStrings(s: string, goal: string) {
  if (s.length !== goal.length) return false;
  if (s === goal) {
    const map = new Map<string, number>();
    for (let item of s) {
      map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
      if (map.get(item)! > 1) {
        return true;
      }
    }
    return false;
  }
  let first = -1,
    second = -1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      if (first === -1) {
        first = i;
      } else if (second === -1) {
        second = i;
      } else {
        return false;
      }
    }
  }
  return s[first] === goal[second] && s[second] === goal[first];
}
