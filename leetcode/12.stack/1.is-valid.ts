// leetcode 20

export default function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const peek = stack.pop();
      if (!peek || map.get(peek) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
