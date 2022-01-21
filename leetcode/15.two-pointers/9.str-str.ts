// leetcode 28

export default function strStr(hayStack: string, needle: string) {
  if (!needle) return 0;
  let res = -1;
  let index = 0;
  while (index < hayStack.length) {
    const current = hayStack[index];
    if (hayStack.length - index < needle.length) break;
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < index + needle.length; i++) {
        if (hayStack[i] !== needle[i - index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = index;
        break;
      }
    }
    index++;
  }
  return res;
}
