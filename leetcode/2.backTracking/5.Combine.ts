/**
 * @description leetcode 77
 */

export default function combine(n: number, k: number): number[][] {
  const res: number[][] = [];
  const backtrack = (start: number, path: number[]) => {
    if (path.length + n - start + 1 < k) return;
    if (path.length === k) {
      res.push(path);
      return;
    }
    for (let i = start; i <= n; i++) {
      backtrack(i + 1, path.concat(i));
    }
  };
  backtrack(1, []);
  return res;
}
