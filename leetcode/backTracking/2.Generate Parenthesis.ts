/**
 * @description leetcode 22
 */

export default function generateParenthesis(n: number): string[] {
  if (n === 0) return [];
  const res: string[] = [];
  const backtrack = (path: string, open: number, close: number) => {
    if (path.length === n * 2) {
      res.push(path);
      return;
    }
    if (open < n) {
      backtrack(path + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(path + ")", open, close + 1);
    }
  };
  backtrack("", 0, 0);
  return res;
}
