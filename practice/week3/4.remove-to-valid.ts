// leetcode 1249

export default function removeToValid(s: string) {
  const removeSet = new Set<number>();
  const stack: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (current === "(") {
      stack.push(i);
    } else if (current === ")") {
      if (stack.length > 0) {
        stack.pop();
      } else {
        removeSet.add(i);
      }
    }
  }
  while (stack.length > 0) {
    removeSet.add(stack.pop()!);
  }
  let res = "";
  for (let i = 0; i < s.length; i++) {
    if (!removeSet.has(i)) {
      res += s[i];
    }
  }
  return res;
}
