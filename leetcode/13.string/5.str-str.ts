// leetcode 28

export default function strStr(haystack: string, needle: string) {
  if (!needle) return 0;
  if (haystack.length < needle.length) return -1;
  let res = -1;
  let index = 0;
  while (index < haystack.length) {
    if (haystack.length - index < needle.length) break;
    const current = haystack[index];
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < index + needle.length; i++) {
        if (haystack[i] !== needle[i - index]) {
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
