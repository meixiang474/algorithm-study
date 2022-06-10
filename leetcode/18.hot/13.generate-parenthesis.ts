// leetcode 22

export default function generateParenthesis(n: number) {
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length >= 2 * n) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close + 1);
    }
  };
  dfs("", 0, 0);
  return res;
}
