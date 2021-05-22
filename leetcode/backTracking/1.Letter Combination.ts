/**
 * @description leetcode 17
 */

export default function letterCombinations(digits: string): string[] {
  if (digits === "") return [];
  const arr = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const res: string[] = [];
  const backtrack = (path: string, length: number) => {
    if (length === digits.length) {
      res.push(path);
      return;
    }
    const current = arr[parseInt(digits[length])];
    for (let i = 0; i < current.length; i++) {
      const char = current[i];
      backtrack(path + char, length + 1);
    }
  };
  backtrack("", 0);
  return res;
}
