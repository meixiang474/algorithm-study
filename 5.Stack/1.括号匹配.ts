// leetcode 20
export {};
function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set('{', '}');
  map.set('[', ']');
  map.set('(', ')');
  const stack = [] as string[];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      stack.push(current);
    } else {
      const res = stack.pop();
      if (res == null || map.get(res) !== current) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
