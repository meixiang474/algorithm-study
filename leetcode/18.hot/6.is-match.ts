// leetcode 10

export default function isMatch(s: string, p: string): boolean {
  if (p.length === 0) {
    return s.length === 0;
  }
  let match = false;
  if (s.length > 0 && (p[0] === s[0] || p[0] === ".")) {
    match = true;
  }
  if (p.length > 1 && p[1] === "*") {
    return isMatch(s, p.slice(2)) || (match && isMatch(s.slice(1), p));
  } else {
    return match && isMatch(s.slice(1), p.slice(1));
  }
}
