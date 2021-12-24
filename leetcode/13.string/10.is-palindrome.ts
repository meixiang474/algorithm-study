// leetcode 125

export default function isPalindrome(s: string) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    const currentL = s[l];
    const currentR = s[r];
    if (
      isNaN(parseInt(currentL)) &&
      currentL.toLowerCase() === currentL.toUpperCase()
    ) {
      l++;
      continue;
    }
    if (
      isNaN(parseInt(currentR)) &&
      currentR.toLowerCase() === currentR.toUpperCase()
    ) {
      r--;
      continue;
    }
    if (currentL.toLowerCase() !== currentR.toLowerCase()) return false;
    l++
    r--
  }
  return true;
}