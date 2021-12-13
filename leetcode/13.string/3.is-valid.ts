// leetcode 20

export default function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set("[", "]");
  map.set("(", ")");
  map.set("{", "}");
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
